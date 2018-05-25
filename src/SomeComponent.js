import React, { Component } from 'react'

class SomeComponent extends Component {
  // constructor(props) {
  //   super(props)
  // }

  componentDidMount() {
    this.props.zombieHelper.createRandomZombie(name, {gas: 540000, from: this.props.user})
  }

  render() {
    return(
      <div>hello</div>
    )
  }
}

export default SomeComponent
