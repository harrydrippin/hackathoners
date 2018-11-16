import Axios, { AxiosInstance } from 'axios';
import * as React from 'react';
import { Badge, Button } from 'reactstrap';
import * as constants from '../../constants';
import './update.css';
import { ApiCrawlInfoResponse } from 'src/types';

interface UpdatePageState {
  timestamp: number,
  is_ongoing: boolean
}

export class UpdatePage extends React.Component<any, UpdatePageState> {
  public state: UpdatePageState = {
    timestamp: -1,
    is_ongoing: false
  }

  private axios: AxiosInstance = Axios.create({
    baseURL: constants.API_SERVER_URL
  });

  public componentDidMount = () => {
    this.axios.get("/api/crawl")
      .then((resp) => {
        const data: ApiCrawlInfoResponse = resp.data;
        this.setState({
          timestamp: data.timestamp,
          is_ongoing: data.is_ongoing
        });
      })
      .catch((err) => {
        alert("서버와의 통신 중 오류가 발생했습니다. 나중에 다시 시도하세요.")
      });
  }

  public startCrawling = () => {
    this.axios.post("/api/crawl")
      .then((resp) => {
        const data: any = resp.data;
        if (data.status === 0) {
          alert("Crawling Job이 시작되었습니다.\n완료되기까지 수 분이 소요될 수 있습니다.");
        } else {
          alert("현재 서버에서 이미 Crawling Job이 진행 중입니다.\n잠시만 기다려주세요!");
        }
      })
  }

  public renderLoad = () => (
    <p>불러오는 중...</p>
  )

  public renderContent = () => (
    <div>
      <span>마지막 업데이트 시간 : {new Date(this.state.timestamp * 1000).toString()}</span>
      <br />
      <span>현재 서버 상태 : </span> 
      {
        (this.state.is_ongoing) ? <Badge color="danger">Crawling 진행 중</Badge>
        : <Badge color="success">정상</Badge>
      }
      <br /><br />
      <Button color="primary" onClick={this.startCrawling}>Crawling 시작하기</Button>
    </div>
  )

  public render() {
    if (this.state.timestamp === -1) {
      return this.renderLoad();
    }
    return (
      <div className="update__wrapper">
        <h3>최신 정보 가져오기</h3>
        <p>아래 버튼을 누르면 현재 기준 최신 정보로 DB를 업데이트합니다.</p>
        <hr />
        {this.renderContent()}
      </div>
    );
  }
}