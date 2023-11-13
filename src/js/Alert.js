import alertsData from './alerts.json' assert { type: 'json'}
// const alertsData = require("./alerts.json");


// Alert.js
class Alert {
  constructor() {
    this.alerts = this.loadAlerts();
    if (this.alerts.length > 0) {
      this.createAlertSection();
    }
  }

  loadAlerts() {
    try {
      return alertsData;
    } catch (error) {
      // eslint-disable-next-line no-console
      console.error("Error loading alerts:", error);
      return [];
    }
  }

  createAlertSection() {
    const alertSection = document.createElement("section");
    alertSection.className = "alert-list";

    this.alerts.forEach((alert) => {
      const alertElement = this.createAlertElement(alert);
      alertSection.appendChild(alertElement);
    });

    document.querySelector("main").prepend(alertSection);
  }

  createAlertElement(alert) {
    const alertElement = document.createElement("p");
    alertElement.textContent = alert.message;
    alertElement.style.backgroundColor = alert.background;
    alertElement.style.color = alert.color;

    return alertElement;
  }
}

export default Alert;
