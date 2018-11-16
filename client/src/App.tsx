import * as React from 'react'
import { BrowserRouter, Route } from 'react-router-dom';
import { Header } from 'src/components/header';
import { SidebarNav } from 'src/components/sidebarnav';
import { MainPage } from './pages/main';
import { ReportPage } from './pages/report';

export class App extends React.Component<any, any> {
  public render() {
    return (
      <div className="wrapper">
        <Header />
        <div className="container-fluid">
          <div className="row">
            <SidebarNav />
            <main role="main" className="col-md-9 ml-sm-auto col-lg-10 pt-3 px-4">
              <BrowserRouter>
                <div>
                  <Route path="/" component={MainPage} exact={true} />
                  <Route path="/repo/:owner/:project" component={ReportPage} exact={true} />
                </div>
              </BrowserRouter>
            </main>
          </div>
        </div>
      </div>
    );
  }
}