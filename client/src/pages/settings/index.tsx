import Axios, { AxiosInstance } from 'axios';
import * as React from 'react';
import {Alert, Button, FormGroup, Input, Label} from 'reactstrap';
import './settings.css';
import * as constants from '../../constants';

interface SettingsPageState {
  load: boolean,
  compare: string,
  target: string
}

export class SettingsPage extends React.Component<any, SettingsPageState> {
  public state: SettingsPageState = {
    load: false,
    compare: "",
    target: ""
  }

  private axios: AxiosInstance = Axios.create({
    baseURL: constants.API_SERVER_URL
  });

  public componentDidMount = () => {
    this.axios.get("/api/list")
      .then((resp) => {
        const data: any = resp.data;
        if (data.result === 1) {
          this.setState({
            load: true,
            compare: "",
            target: ""
          });
        }
        else {
          this.setState({
            load: true,
            compare: data.compare.join("\n"),
            target: data.target.join("\n")
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

  public onCompareChange = (event: any) => {
    this.setState({
      compare: event.currentTarget.value
    });
  }

  public onTargetChange = (event: any) => {
    this.setState({
      target: event.currentTarget.value
    });
  }

  public save = () => {
    const {compare, target} = this.state
    this.axios.post("/api/list", {
      compare: compare.split("\n"), 
      target: target.split("\n")}
    )
      .then((resp) => {
        const data: any = resp.data
        if (data.result === 1) {
          alert("저장되었으나 이미 Crawling이 진행 중입니다.\n잠시 후 최신 정보 불러오기를 통해 다시 시도하세요.");
        } else {
          alert("완료되었습니다.\nCrawling 완료까지 수 분이 소요될 수 있습니다.")
        }
        location.reload();
      })
      .catch((err) => {
        alert("서버와의 통신 중 오류가 발생했습니다. 나중에 다시 시도하세요.")
      });
  }

  public render() {
    if (!this.state.load) {
      return this.renderLoad();
    }
    return (
      <div className="setting__wrapper">
        <h3>Repository 정보 설정</h3>
        <p>
          Repository 정보를 설정합니다. 아래의 텍스트를 수정하여 분석이 필요한 Repository를 적어넣으십시오. <br />
          각 Repository는 개행으로 구분되며, <code>owner/project_name</code>의 꼴이어야 합니다.<br />
          하단의 저장 버튼을 누르면 수정된 Repository를 분석하며, 최신 정보가 반영되기까지 수 분이 소요될 수 있습니다.
        </p>
        <Alert color="danger">
          <b>주의!</b> 본 목록을 수정하면 수정 사항이 모든 사용자에게 반영됩니다.
        </Alert>
        <hr />
        <FormGroup>
          <Label for="compare">대조군 Repository</Label>
          <Input type="textarea" onChange={this.onCompareChange} value={this.state.compare} name="text" id="compare" rows={5}/>
        </FormGroup>
        <FormGroup>
          <Label for="target">분석 대상 Repository</Label>
          <Input type="textarea" onChange={this.onTargetChange} value={this.state.target} name="text" id="target" rows={5}/>
        </FormGroup>
        <Button color="primary" onClick={this.save}>저장</Button>
      </div>
    );
  }
}