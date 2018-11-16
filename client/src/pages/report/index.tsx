import Axios, { AxiosInstance } from 'axios';
import * as React from 'react';
import * as constants from '../../constants';
import { Report } from 'src/types';

interface ReportPageState {
  load: boolean,
  report: Report | undefined
}

export class ReportPage extends React.Component<any, ReportPageState> {
  public state: ReportPageState = {
    load: false,
    report: undefined
  };

  private axios: AxiosInstance = Axios.create({
    baseURL: constants.API_SERVER_URL
  });
  
  public componentDidMount = () => {
    const {owner, project} = this.props.match.params;
    this.axios.post("/api/detail", {repo: owner + "/" + project})
      .then((resp) => {
        const data: any = resp.data;
        if (data.result === 1) {
          this.setState({
            load: true,
            report: undefined
          });
        } else {
          this.setState({
            load: true,
            report: data.detail
          });
        }
      })
      .catch((err) => {
        alert("서버와의 통신 중 오류가 발생했습니다. 나중에 다시 시도하세요.")
      });
  }

  public renderLoad = () => (
    <div>
      불러오는 중...
    </div>
  );
  
  public render() {
    if (!this.state.load) {
      return this.renderLoad();
    }
    if (this.state.report === undefined) {
      alert("서버에 보고서가 존재하지 않습니다.\nCrawling을 재요청해주세요.");
      location.href = "/";
    }

    return (
      <div>{JSON.stringify(this.state.report!)}</div>
    )
  }
}