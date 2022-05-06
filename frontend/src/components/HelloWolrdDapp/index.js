//

//
import React, { Component, Fragment } from 'react';
import { connect } from "react-redux";
//
import { ethers } from "ethers";
import Web3Provider from "../../services/web3Provider"
import ContractAddress from "../../contracts/addresess.json"
import HelloWorldContractAbi from "../../contracts/HelloWorld.json"
import { Contract } from 'ethers';
import Loading from "../Loading"
//


class HelloWorldDapp extends Component {

    state = {
        form: {
            value: ''
        },
        contract: undefined,
        events: []
    }
    //#region constructor
    constructor(props) {
        super(props);
        this.handleChange = this.handleChange.bind(this);
        this.handleSubmit = this.handleSubmit.bind(this);
        let { provider } = Web3Provider.getInstance();
        this.state.signer = provider.getSigner()
        this.state.contract = new Contract(ContractAddress.HelloWorld, HelloWorldContractAbi, provider);
        this.state.contractWithSigner = this.state.contract.connect(this.state.signer);

        this._addEventsToStateHelper = this._addEventsToStateHelper.bind(this);
    }
    //#endregion

    //#region Life Cycle
    async componentDidMount() {

        const events = await this.state.contract.queryFilter("MessageSet", "earliest", "latest")
        events.map(this._addEventsToStateHelper);
        this.state.contract.on("MessageSet", (from, to, value) => {
            this._addEventsToStateHelper(value);

        });
    }

    componentDidUpdate(prevProps) {


    }
    componentWillUnmount() {
        this.state.contract.removeAllListeners();
    }
    //#endregion

    _addEventsToStateHelper(eventData) {

        try {
            let value = ethers.utils.parseBytes32String(`${eventData.args._msg}`);

            this.setState((prevState) => ({
                ...prevState,
                events: prevState.events.filter(x => x.transactionHash != eventData.transactionHash).concat({
                    transactionHash: eventData.transactionHash,
                    from: eventData.args._from,
                    rawMsg: eventData.args._msg,
                    msg: value
                })
            }));
        } catch (ex) {
            console.log(ex)
        }
    }
    handleChange(event) {
        this.setState((prevState) => ({
            ...prevState,
            form: {
                value: event.target.value
            }
        }));
    }

    async handleSubmit(event) {
        event.preventDefault();
        let bytes32 = ethers.utils.formatBytes32String(this.state.form.value)

        this.setState({
            isSubmitting: true
        });

        try {
            let tx = await this.state.contractWithSigner.SetMsg(bytes32);

            this.setState({
                transaction: tx
            })
            console.log(tx)
            const receipt = await tx.wait();

            this.setState({
                receipt,
                isSubmitting: false
            })

            console.log(receipt)

            let eventData = receipt.events[0];
            this._addEventsToStateHelper(eventData);
        } catch (ex) {
            this.setState({
                isSubmitting: false
            })
        }
    }


    render() {
        const { form, isSubmitting, events, transaction } = this.state;
        return (
            <div className='row'>
                <div className='col-lg-6'>
                    <h3 className='text-center'>Contract</h3>
                    <div className='mt-1 p-5'>
                        <table >
                            <tr>
                                <td>
                                    Contract Address :
                                </td>
                                <td>
                                    {ContractAddress.HelloWorld}
                                </td>
                            </tr>
                            {transaction &&
                                <tr>
                                    <td>
                                        Transaction Hash :
                                    </td>
                                    <td>
                                        {transaction.hash}
                                    </td>
                                </tr>
                            }
                        </table>
                    </div>
                    <div className='m-1 p-5'>
                        <form className='form' onSubmit={this.handleSubmit}>
                            <div className='form-group'>
                                <label>Message:</label>
                                <input type="text" className='form-control' value={form.value} onChange={this.handleChange} />
                            </div>
                            <input type="submit" disabled={isSubmitting} className='mt-3 btn btn-primary' value="Submit" />
                            <Loading isLoading={isSubmitting} />
                        </form>
                    </div>

                </div>
                <div className='col-lg-6'>
                    <h3 className='text-center'>Events</h3>
                    <div className='mt-1 p-5'>
                        <table className='table table-sm'>
                            <thead>
                                <tr>
                                    <th>From</th>
                                    <th>Msg</th>
                                </tr>
                            </thead>
                            <tbody>
                                {events.map((data, index) => (
                                    <tr key={index}>
                                        <td>{data.from}</td>
                                        <td>{data.msg}</td>
                                    </tr>
                                ))}
                            </tbody>

                        </table>
                    </div>
                </div>
            </div>
        );
    }
}

function mapStateToProps(state, props) {

    return {

    };
}



const mapDispatchToProps = {

};

export default connect(
    mapStateToProps,
    { ...mapDispatchToProps }
)((HelloWorldDapp));

