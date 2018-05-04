import React, { Component } from "react";
import Timeline from "react-calendar-timeline";
import moment from "moment";

const groups = [{ id: 1, title: "group 1" }, { id: 2, title: "group 2" }];

const items = [
  {
    id: 1,
    group: 1,
    title: "item 1",
    start_time: moment(),
    end_time: moment().add(1, "hour")
  },
  {
    id: 2,
    group: 2,
    title: "item 2",
    start_time: moment().add(-0.5, "hour"),
    end_time: moment().add(0.5, "hour")
  },
  {
    id: 3,
    group: 1,
    title: "item 3",
    start_time: moment().add(2, "hour"),
    end_time: moment().add(3, "hour")
  }
];

export default class CustomTimeline extends Component {
  state = {
    logs: [],
    showDummy: true
  };
  onCanvasClick(groupId, time, e) {
    this.setState({
      logs: [
        ...this.state.logs,
        { groupId, time: moment(time).format("YYYY-MM-DD HH:mm:ss") }
      ]
    });
  }
  clear = () => this.setState({ logs: [] });
  toggleDummy = () => this.setState({ showDummy: !this.state.showDummy });
  render() {
    const { logs, showDummy } = this.state;
    return (
      <div>
        {showDummy && (
          <div>{new Array(5).fill(0).map(xx => <h4>Dummy Data here</h4>)}</div>
        )}
        <Timeline
          groups={groups}
          items={items}
          defaultTimeStart={moment().add(-12, "hour")}
          defaultTimeEnd={moment().add(12, "hour")}
          onCanvasClick={this.onCanvasClick.bind(this)}
        />
        <button onClick={this.toggleDummy}>Toggle Dummy Data</button>
        <h3>Click on canvas:</h3>
        <button onClick={this.clear}>Clear</button>
        <ul>
          {logs.map((log, i) => (
            <li key={i}>{`GroupId: ${log.groupId}, time: ${log.time}`}</li>
          ))}
        </ul>
      </div>
    );
  }
}
