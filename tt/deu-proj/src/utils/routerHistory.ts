class RouterHistory {
  currentUrl: string = '';
  historyUrl: string = '';
/**
 * 
 * @param cur should start with "/"
 * @param prev 
 */
  setParams(cur:string) {
    this.historyUrl = this.currentUrl;
    this.currentUrl = new URL(cur, 'https://fahrplan.guru').pathname;
  }

  get getPrev() {
    return this.historyUrl
  }

  get getCurrent() {
    return this.currentUrl
  }

  get comparedJourneyUrl() {
    return this.currentUrl === this.historyUrl
  }

  get comparedStopUrl() {
    return this.historyUrl.match(/\/haltestelle\//)
  }

  get comparedJourneyLanding() {
    return this.historyUrl.match(/\/reise\/place\//);
  }

  get comparedJourneyFlight() {
    return this.historyUrl.match(/\/reise\/airport\//);
  }
}

export default new RouterHistory()

