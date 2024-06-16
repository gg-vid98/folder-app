
import './App.css';
import React,{useState} from 'react'
const Node = ({node,onAdd,onDelete}) => {
  const [isExpanded, setIsExpanded] = useState(node.toggled);
  const handleToggle = ()=>{
     setIsExpanded(!isExpanded)
  }
  const handleAdd = () => {
     const name = prompt("Enter name:");
     if (name) {
         const isFolder = window.confirm("Is it a folder?");
         onAdd(node, name, isFolder);
     }
 };
 
 const handleDelete = () => {
     if (window.confirm("Are you sure you want to delete this item?")) {
         onDelete(node);
     }
 };
 
   return (
 <div style={{ marginLeft: 20 }}>
             <div>
                 <span onClick={handleToggle} style={{ cursor: 'pointer' }}>
                     {node.children ? (isExpanded ? "📂" : "📁") : "📄"} {node.name}
                 </span>
                 <button onClick={handleAdd} style={{ marginLeft: 10 }}>Add</button>
                 {node.name !== 'root' && <button onClick={handleDelete} style={{ marginLeft: 10 }}>Delete</button>}
             </div>
             {isExpanded && node.children && (
                 <div style={{ paddingLeft: 20 }}>
                     {node.children.map((child, index) => (
                         <Node
                             key={index}
                             node={child}
                             onAdd={onAdd}
                             onDelete={onDelete}
                         />
                     ))}
                 </div>
             )}
         </div>
 
 
   )
 }
 


const FileManager = () => {
  const [nodes,setNodes] = useState({ name: 'root',
      toggled: true,
      children: []})
  const handleAdd = (node,name,isFolder) =>{
      const newNode = isFolder ? {name, toggled:false, children:[]} : {name}
      node.children = node.children || []
      node.children.push(newNode);
      setNodes({ ...nodes });


  }
  const handleDelete = (node) =>{
      const deleteNode = (nodes, nodeToDelete) => {
          return nodes.filter(n => n !== nodeToDelete).map(n => {
              if (n.children) {
                  n.children = deleteNode(n.children, nodeToDelete);
              }
              return n;
          });
      };
      if (nodes === node) return;
      setNodes({
          ...nodes,
          children: deleteNode(nodes.children, node)
      });

  }
return (
  <Node node={nodes} onAdd={handleAdd} onDelete={handleDelete}/>
 
)
}

function App() {
  return (
    <div className="App">
      <FileManager/>
    </div>
  );
}

export default App;
