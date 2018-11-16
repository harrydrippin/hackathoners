import * as React from "react";
import "./header.css";

export class Header extends React.Component<any, any> {
  public render() {
    return (
        <nav className="navbar navbar-dark sticky-top bg-dark flex-md-nowrap p-0">
            <a className="navbar-brand col-sm-3 col-md-2 mr-0" href="#">Hackathoners</a>
            <div className="navbar-description w-100 d-none d-md-block">
                VTT Research Project Opensource Analyse Report
            </div>
        </nav>
    );
  }
}