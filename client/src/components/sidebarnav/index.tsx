import Axios, { AxiosInstance } from 'axios';
import * as React from 'react';
import "./sidebarnav.css";
import * as constants from '../../constants';
import { ApiListResponse } from 'src/types';

interface SidebarNavState {
  load: boolean,
  compare: string[],
  target: string[]
}

export class SidebarNav extends React.Component<any, SidebarNavState> {
  public state: SidebarNavState = {
    load: false,
    compare: [],
    target: []
  };
  
  private axios: AxiosInstance = Axios.create({
    baseURL: constants.API_SERVER_URL
  });
  
  public componentDidMount = () => {
    this.axios.get("/api/list")
      .then((resp) => {
        const data: ApiListResponse = resp.data;
        this.setState({
          compare: data.compare,
          target: data.target,
          load: true
        });
      })
      .catch((err) => {
        alert("서버와의 통신 중 오류가 발생했습니다. 다시 시도해주세요.");
      });
  };

  public renderLoad = () => (
    <ul className="nav flex-column mb-2">
      <li className="nav-item">
        <a className="nav-link" href="">
          불러오는 중...
        </a>
      </li>
    </ul>
  );

  public renderItem = (name: string, key: number) => (
    <li className="nav-item" key={key}>
      <a className="nav-link" href="">
        {name}
      </a>
    </li>
  );
  
  public render() {
    if (!this.state.load) { return this.renderLoad(); }
    return (
      <nav className="col-md-2 d-none d-md-block bg-light sidebar">
        <div className="sidebar-sticky">
          <h6 className="sidebar-heading d-flex justify-content-between align-items-center px-3 mt-4 mb-1 text-muted">
            <span>종합</span>
          </h6>
          <ul className="nav flex-column mb-2">
            <li className="nav-item">
              <a className="nav-link" href="">
                개요
              </a>
            </li>
          </ul>
          <h6 className="sidebar-heading d-flex justify-content-between align-items-center px-3 mt-4 mb-1 text-muted">
            <span>대조군</span>
          </h6>
          <ul className="nav flex-column mb-2">
            {this.state.compare.map((v, i) => {
              return this.renderItem(v, i);
            })}
          </ul>
          <h6 className="sidebar-heading d-flex justify-content-between align-items-center px-3 mt-4 mb-1 text-muted">
            <span>Repository 보고서</span>
          </h6>
          <ul className="nav flex-column mb-2">
            {this.state.target.map((v, i) => {
              return this.renderItem(v, i);
            })}
          </ul>
          <h6 className="sidebar-heading d-flex justify-content-between align-items-center px-3 mt-4 mb-1 text-muted">
            <span>관리</span>
          </h6>
          <ul className="nav flex-column mb-2">
            <li className="nav-item">
              <a className="nav-link" href="/update">
                최신 정보 가져오기
              </a>
            </li>
            <li className="nav-item">
              <a className="nav-link" href="/settings">
                설정
              </a>
            </li>
          </ul>
        </div>
      </nav>
    );
  }
}