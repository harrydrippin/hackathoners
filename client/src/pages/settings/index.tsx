import * as React from 'react';
import {Button, FormGroup, Input, Label} from 'reactstrap';
import './settings.css';

export class SettingsPage extends React.Component<any, any> {
  public render() {
    return (
      <div className="setting__wrapper">
        <h3>Repository 정보 설정</h3>
        <p>
          Repository 정보를 설정합니다. 아래의 텍스트를 수정하여 분석이 필요한 Repository를 적어넣으십시오. <br />
          각 Repository는 개행으로 구분되며, Github URL이어야 합니다.<br />
          하단의 저장 버튼을 누르면 수정된 Repository를 분석하며, 최신 정보가 반영되기까지 수 분이 소요될 수 있습니다.
        </p>
        <hr />
        <FormGroup>
          <Label for="exampleText">대조군 Repository</Label>
          <Input type="textarea" name="text" id="exampleText" rows={5}/>
        </FormGroup>
        <FormGroup>
          <Label for="exampleText">분석 대상 Repository</Label>
          <Input type="textarea" name="text" id="exampleText" rows={5}/>
        </FormGroup>
        <Button color="primary">저장</Button>
      </div>
    );
  }
}