import React, { Component } from 'react';
import logo from './logo.svg';
import './App.css';
import Button from './components/Button';
import InputBlock from './components/InputBlock';
import Iframe from './components/Iframe';
import InputLabel from './components/InputLabel';

const DEFAULT_APP_ID = '123';
const DEFAULT_USER_ID = '123';
const DEFAULT_HOST = '10.90.26.137:9000';

const VAST_WITH_ENDCARD_URL = `http://{host}/?`;
const VPAID_AD_URL = "http://{host}/?client=browser&vastoffer=vpaid-innovid&";
const INTERACTIVE_VPAID_AD_URL = "http://{host}/?vastoffer=vpaid&vpaidoffer=interactive&";
const VPAID_AD_NO_FACTORY_URL = "http://{host}/?vastoffer=vpaid&vpaidoffer=nofactory&";
const VPAID_AD_INVALID_OFFER_URL = "http://{host}/?vastoffer=vpaid&vpaidoffer=invalid&";
const LAST_LOOK_FEATURE_URL = "http://{host}/?multiple_ads=true&number_of_slow_ads=3&time_per_ad=2&last_look=mp4&";
const OFFER_WALL_URL = 'http://{host}/?impression_url=http%3A%2F%2Flocalhost%3A4567%2Fshow%2FFyber%3Fvastoffer%3Dmp4&';
const AMS_PREVIEW_URL = 'http://{host}/?preview=http%3A%2F%2Flocalhost%3A4567%2Fpreview&';
const NOOP_MODE_URL = 'http://{host}/?mode=noop&';
const DEFAULT_MODE = 'vast_endcard';

class App extends Component {

  constructor() {
    super();

    this.state = {
      mode: DEFAULT_MODE,
      url: '',
      edit_url: '',
      app_id: DEFAULT_APP_ID,
      uid: DEFAULT_USER_ID,
      host: DEFAULT_HOST,
      edit: false
    };

    this.buttons = [
      <Button caption="Play a VAST video with an End Card" onClick={() => { this.loadVideo('vast_endcard') }} />,
      <Button caption="Play a classical VPAID Ad" onClick={() => { this.loadVideo('vpaid_ad') }} />,
      <Button caption="Play a tailored VPAID Ad" onClick={() => { this.loadVideo('interactive_vpaid_ad') }} />,
      <Button caption="Play a VPAID Ad that has no factory method" onClick={() => { this.loadVideo('vpaid_ad_no_factory') }} />,
      <Button caption="Play a VPAID Ad that does not implement all required methods" onClick={() => { this.loadVideo('vpaid_ad_invalid_offer') }} />,
      <Button caption="Play an Ad with Last Look" onClick={() => { this.loadVideo('last_look_feature') }} />,
      <Button caption="Play an Ad with OfferWall" onClick={() => { this.loadVideo('offerwall') }} />,
      <Button caption="Play an Ad with AMS preview feature" onClick={() => { this.loadVideo('ams_preview') }} />,
      <Button caption="Play an Ad in noop mode" onClick={() => { this.loadVideo('noop') }} />,

    ];

    this.inputs = [
      <InputBlock label="App Id" value={DEFAULT_APP_ID} onChange={this.onChangeAppId.bind(this)} />,
      <InputBlock label="User Id" value={DEFAULT_USER_ID} onChange={(event) => { this.setState({uid: event.target.value}) }} />,
      <InputBlock label="Host" value={DEFAULT_HOST} onChange={(event) => { this.setState({host: event.target.value}) }} />,
    ];
  }

  render() {

    return (
      <div className="App">
        <header className="App-header">
          <img src={logo} className="App-logo" alt="logo" />
          <h1 className="App-title">MBE React Application</h1>
        </header>
        <div className="container">
          <div className="buttons">{this.buttons.map((button, index) => (<div key={index}>{button}</div>))}</div>
          <div className="row">
            <InputLabel prefix="URL: " text={this.state.url} edit={this.state.edit}  onChange={(event) => { this.setState({edit_url: event.target.value}) }} />
          </div>
          <div className="inputs">
            {this.inputs.map((input, index) => (<div key={index}>{input}</div>))}
          </div>

          <div className="row">
            <Button caption="Reload" onClick={() => { this.reload() }} />
          </div>
          <div className="row">
            <Button caption="Change manually URL" onClick={() => { this.changeURL() }} />
          </div>
          <div className="row">
            <Button caption="Reset" onClick={() => { this.reset() }} />
          </div>
          <div className="iframe">
            <Iframe url={this.state.url} width="560" height="315" ></Iframe>
          </div>
        </div>
      </div>
    );
  }

  onChangeAppId(event) {    
    this.setState({app_id: event.target.value});
  }

  getBaseUrl(mode) {
    let config = {
      'vast_endcard': VAST_WITH_ENDCARD_URL,
      'vpaid_ad': VPAID_AD_URL,
      'interactive_vpaid_ad': INTERACTIVE_VPAID_AD_URL,
      'vpaid_ad_no_factory': VPAID_AD_NO_FACTORY_URL,
      'vpaid_ad_invalid_offer': VPAID_AD_INVALID_OFFER_URL,
      'last_look_feature': LAST_LOOK_FEATURE_URL,
      'offerwall': OFFER_WALL_URL,
      'ams_preview': AMS_PREVIEW_URL,
      'noop': NOOP_MODE_URL
    };

    let url = config[mode];
    url = url.replace('{host}', this.state.host);

    return url;
  }

  loadVideo(mode) {
    let url = this.buildUrl(mode);

    this.setState({
      mode,
      url,
      edit_url: url,
      edit: false
    });
  }

  reload() {
    this.setState(
      {url: this.buildUrl()}
    );
  }

  buildUrl(mode = this.state.mode) {
    return this.getBaseUrl(mode) + `appid=${this.state.app_id}&uid=${this.state.uid}`;
  }

  reset() {
    this.setState({
      mode: DEFAULT_MODE,
      url: '',
      app_id: DEFAULT_APP_ID,
      uid: DEFAULT_USER_ID
    });
  }

  changeURL() {
    this.setState(
      {
        edit: !this.state.edit,
        url: this.state.edit_url
      }
    );
  }
}

export default App;
