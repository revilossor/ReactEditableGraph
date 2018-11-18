# React Editable Graph

This component renders an svg representation of a graph. It can be edited, and the resulting graph data can be exported.

the component is like this

```html
  <EditableGraph width={some_big_width} height={some_big_height} model={props.graph} />
```

a graph model looks like this

```javascript
  graph: {
    nodes: [
      { id: "1", x: 5100, y: 5080, ports: { in: [], out: ["", ""] } },
      { id: "2", x: 5470, y: 5180, ports: { in: [""], out: [""] } },
      { id: "2.5", x: 5500, y: 5500, ports: { in: [""], out: [] } },
      {
        id: "3",
        x: 5700,
        y: 5700,
        ports: { in: ["", "", ""], out: [""] }
      }
    ],
    edges: [
      {
        id: "1_out_0_to_2_in_0",
        start: "1_out_0",
        end: "2_in_0",
        points: [{ x: 5300, y: 5100 }]
      },
      {
        id: "1_out_1_to_2.5_in_0",
        start: "1_out_1",
        end: "2.5_in_0",
        points: [{ x: 5250, y: 5300 }, { x: 5300, y: 5500 }]
      }
    ]
  }
```
