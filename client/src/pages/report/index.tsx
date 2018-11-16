import * as React from 'react';

export class ReportPage extends React.Component<any, any> {
  public render() {
    const {owner, project} = this.props.match.params;
    return (
      <div>Hello, this is {owner}/{project} page!</div>
    )
  }
}