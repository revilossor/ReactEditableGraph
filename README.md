# React Editable Graph

This component renders an svg representation of a graph. It can be edited, and the resulting graph data can be exported.

the component is like this

```html
  <EditableGraph model={some_graph_model} onChange={graph => {}} />
```

a graph model looks like this

```javascript
  {
    nodes: [
      { id: '1', x: 100, y: 80 },
      { id: '2', x: 200, y: 30 }
    ],
    edges: [
      {
        start: { node: '1', port: 'out_0', points: [ { x: 100, y: 100 } ] },
        end: { node: '2', port: 'in_1', points: [ { x: 100, y: 120 } ] }
      }
    ]
  }
```
