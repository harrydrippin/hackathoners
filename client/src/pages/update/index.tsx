import * as React from 'react';
import { Badge, Button } from 'reactstrap';
import './update.css';

export class UpdatePage extends React.Component<any, any> {
  public render() {
    return (
      <div className="update__wrapper">
        <h3>최신 정보 가져오기</h3>
        <p>아래 버튼을 누르면 현재 기준 최신 정보로 DB를 업데이트합니다.</p>
        <hr />
        <span>마지막 업데이트 시간 : {Date.now().toString()}</span><br />
        <span>현재 서버 상태 : </span> <br />
        <Badge color="primary">Crawling이 필요함</Badge>
        <Badge color="danger">Crawling 진행 중</Badge>
        <Badge color="success">최신 사항 반영됨</Badge>
        <Button color="primary">저장</Button>
      </div>
    );
  }
}