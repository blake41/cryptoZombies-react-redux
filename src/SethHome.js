import React, { Component } from 'react'
import { connect } from 'react-redux'
// import logo from './logo.svg'
import './App.css'
import SomeComponent from './SomeComponent'
import { creators, selectors } from './statesauce/src/statesauce'
import zombiefactory_artifacts from '../build/contracts/ZombieFactory.json'
import zombiehelper_artifacts from '../build/contracts/ZombieHelper.json'
class App extends Component {

  constructor(props) {
    super(props)
    this.loadZombies = this.loadZombies.bind(this)
  }

  componentDidMount () {
    this.props.sauceIt('http://127.0.0.1:7545')
    this.props.initializeContract(zombiefactory_artifacts)
    this.props.initializeSecondContract(zombiehelper_artifacts)
  }

  loadZombies(account) {
    this.getZombiesByOwner(account).then((ids) => {
      this.getZombieDetails(ids.map((id)=>{
        return id.toNumber()
      }));
    })
  }

  render () {
    return (
      <div className='App'>
        <header className='App-header'>
          <h1 className='App-title'>Welcome to React</h1>
        </header>
        {this.props.secondContract && <SomeComponent zombieHelper={this.props.secondContract} user={this.props.defaultAccount}/>}
        <p className='App-intro'>
          To get started, edit <code>src/App.js</code> and save to reload.
          Your default account is {this.props.defaultAccount}
        </p>
      </div>
    )
  }
}

const mapStateToProps = state => ({
  defaultAccount: selectors.fromStore.getDefaultAccount(state),
  contract: selectors.fromStore.getContract(state),
  secondContract: selectors.fromStore.getSecondContract(state)
})

const mapDispatchToProps = dispatch => ({
  sauceIt (rpcAddr) {
    dispatch(creators.initWeb3Request(rpcAddr))
  },
  initializeContract (artifact) {
    dispatch(creators.initContractRequest(artifact))
  },
  initializeSecondContract (artifact) {
    dispatch(creators.initSecondContractRequest(artifact))
  }
})

export default connect(mapStateToProps, mapDispatchToProps)(App)
