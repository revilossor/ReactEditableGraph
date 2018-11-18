import { Component } from "react";

import ControlPoint from "./ControlPoint";

const defaults = {
  fill: "none",
  stroke: "#04356c",
  strokeWidth: 6
};

export default class Edge extends Component {
  path(points) {
    return points.reduce(
      (str, point, i) =>
        i == 0
          ? `M ${point[0]} ${point[1]} C`
          : `${str} ${point[0]} ${point[1]}`,
      ""
    );
  }
  computeControlPoints(K) {
    let p1 = new Array();
    let p2 = new Array();
    let n = K.length - 1;

    /*rhs vector*/
    let a = new Array();
    let b = new Array();
    let c = new Array();
    let r = new Array();

    /*left most segment*/
    a[0] = 0;
    b[0] = 2;
    c[0] = 1;
    r[0] = K[0] + 2 * K[1];

    /*internal segments*/
    for (let i = 1; i < n - 1; i++) {
      a[i] = 1;
      b[i] = 4;
      c[i] = 1;
      r[i] = 4 * K[i] + 2 * K[i + 1];
    }

    /*right segment*/
    a[n - 1] = 2;
    b[n - 1] = 7;
    c[n - 1] = 0;
    r[n - 1] = 8 * K[n - 1] + K[n];

    /*solves Ax=b with the Thomas algorithm (from Wikipedia)*/
    for (let i = 1; i < n; i++) {
      let m = a[i] / b[i - 1];
      b[i] = b[i] - m * c[i - 1];
      r[i] = r[i] - m * r[i - 1];
    }

    p1[n - 1] = r[n - 1] / b[n - 1];
    for (let i = n - 2; i >= 0; --i) p1[i] = (r[i] - c[i] * p1[i + 1]) / b[i];

    /*we have p1, now compute p2*/
    for (let i = 0; i < n - 1; i++) p2[i] = 2 * K[i + 1] - p1[i + 1];

    p2[n - 1] = 0.5 * (K[n] + p1[n - 1]);

    return { p1: p1, p2: p2 };
  }

  render() {
    const points = [
      this.props.portPositions[this.props.model.start],
      ...this.props.model.points,
      this.props.portPositions[this.props.model.end]
    ];

    const x = points.map(point => point.x);
    const y = points.map(point => point.y);

    const px = this.computeControlPoints(x);
    const py = this.computeControlPoints(y);

    const controlPoints = points.reduce((cps, point, i, a) => {
      cps.push([point.x, point.y]);
      if (i < a.length - 1) {
        cps.push([px.p1[i], py.p1[i]], [px.p2[i], py.p2[i]]);
      }
      return cps;
    }, []);

    const path = this.path(controlPoints);

    return (
      <g>
        <path
          onDoubleClick={e => {
            this.props.onDoubleClick(e, this.props.model.id);
          }}
          className="edge"
          d={path}
          {...defaults}
        />
        {points.map((point, i) => (
          <ControlPoint
            key={i}
            index={i}
            width={0}
            height={0}
            startDrag={this.props.startDrag}
            model={{ ...point, id: `${this.props.model.id}:::${i}` }}
          />
        ))}
      </g>
    );
  }
}
