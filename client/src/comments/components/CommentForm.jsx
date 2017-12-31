import React, { Component } from 'react'
import PropTypes from 'prop-types'
import { formatDate } from '../../utils/formatDate'

class CommmentForm extends Component {
  static propTypes = {
    comment: PropTypes.object.isRequired,
    onEditFinished: PropTypes.func.isRequired
  }

  onSubmit = (e)  => {
    e.preventDefault()
    const inputs = Array.from(e.target.querySelectorAll('input[id]'))
    const updatedValues = inputs.reduce((c, i) => {
      c[i.id] = i.value
      return c
    }, {})

    updatedValues.timestamp = new Date(updatedValues.timestamp).getTime()
    this.props.onEditFinished(updatedValues)
  };

  render() {
    const { comment } = this.props
    return (
      <div>
        <form onSubmit={this.onSubmit}>
          <div>
            <label htmlFor="body">Body</label>
            <input id="body" type="text" defaultValue={comment.body} />
          </div>

          <div>
            <label htmlFor="author">author</label>
            <input id="author" type="text" defaultValue={comment.author} />
          </div>

          <div>
            <label htmlFor="timestamp">Date</label>
            <input id="timestamp" type="text" defaultValue={formatDate(comment.timestamp)} />
          </div>

          <div><button type="submit">Ok</button><button onCancel={this.onCancel}>Cancel</button></div>
        </form>
      </div>
    )
  }
}

export default CommmentForm
