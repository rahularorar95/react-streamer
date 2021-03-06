import React, { Component } from "react"
import { Link } from "react-router-dom"
import { connect } from "react-redux"
import { fetchStream, deleteStream } from "../../actions"
import Modal from "../Modal"
import history from "../../history"

export class StreamDelete extends Component {
  componentDidMount() {
    this.props.fetchStream(this.props.match.params.id)
  }

  renderContent() {
    if (!this.props.stream) {
      return "Are you sure you want to delete this stream?"
    }

    return `Are you sure you want to delete this stream with title : ${this.props.stream.title} ?`
  }

  render() {
    const id = this.props.match.params.id
    const actions = (
      <>
        {/*Similar to <React.Fragment>*/}
        <button onClick={() => this.props.deleteStream(id)} className="ui button negative">
          Delete
        </button>
        <Link to="/" className="ui button">
          Cancel
        </Link>
      </>
    )

    return (
      <Modal
        title="Delete Stream"
        content={this.renderContent()}
        actions={actions}
        onDismiss={() => history.push("/")}
      />
    )
  }
}

const mapStateToProps = (state, ownProps) => {
  return { stream: state.streams[ownProps.match.params.id] }
}

export default connect(
  mapStateToProps,
  { fetchStream, deleteStream }
)(StreamDelete)
