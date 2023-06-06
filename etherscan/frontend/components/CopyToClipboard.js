import React from 'react';

class CopyToClipboard extends React.Component {
  handleCopy = () => {
    const { text } = this.props;
    const textarea = document.createElement('textarea');
    textarea.value = text;
    document.body.appendChild(textarea);
    textarea.select();
    document.execCommand('copy');
    document.body.removeChild(textarea);
  };

  render() {
    const { text, className, title } = this.props;

    return (
      <td
        className={className}
        title={title}
        onClick={this.handleCopy}
        style={{ cursor: 'pointer' }}
      >
        {text.slice(0, 16)}...
      </td>
    );
  }
}

export default CopyToClipboard;
