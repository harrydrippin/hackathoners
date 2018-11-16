import * as React from 'react';
import { Jumbotron } from 'reactstrap';

export class MainPage extends React.Component<any, any> {
  public render() {
    return (
      <div className="main__wrapper">
        <Jumbotron>
          <h1 className="display-4"><code>printf("Hello, World!");</code></h1><br/>
          <p className="lead"><b>OMMAT(Opensource Maturity Model Analysis Tool)</b>은 오픈소스 소프트웨어 프로젝트의 성숙도를 분석하여 시각화된 데이터를 제공하는 도구입니다.</p>
          <hr/>
          <p>오픈소스 소프트웨어는 소스 코드를 공개하고, 오픈소스 라이선스를 적용하여 해당 소스 코드를 특별한 제한 없이 누구나 보고 사용하고 수정할 수 있도록 공개한 소프트웨어를 말합니다. 이러한 오픈소스 소프트웨어의 경우 불특정 다수의 사람들이 개발에 참여하기 때문에 지속 가능한 개발을 위하여 표준화된 결과물을 유지해야 합니다. 이에 오픈소스 소프트웨어 개발자들은 오픈소스 성숙도 모델(OpenSource Maturity Model)이라는 방법론을 활용하여 오픈소스 소프트웨어를 평가하고 있습니다.</p>
          <p>OMMAT은 오픈소스 커뮤니티(또는 개발자들)이/가 자신들의 프로젝트에 오픈소스 성숙도 모델을 쉽게 적용하고 이를 통해 표준화된 품질을 유지할 수 있도록 돕기 위하여 국민대학교 오픈소스소프트웨어 연구실에서 개발한 툴입니다. 현재 공개된 1.0 버전에서는 지속적인 개발 활동(커밋 개수), 라이센스 적용 여부, 사용 언어에 대한 분석, 이슈 처리에 대한 분석, 개발자들의 개별 기여도 및 협업 현황 등을 제공합니다.</p> 
          <p>국민대학교 오픈소스소프트웨어 연구실에서는 오픈소스 성숙도 모델의 다양한 지표를 정량화 하는 연구 등을 진행할 예정이며, 이를 통해 OMMAT을 오픈소스 생태계에서 의미있는 분석 도구로 발전시켜갈 계획입니다.</p>
        </Jumbotron>
      </div>
    );
  }
}