
import React from 'react';
class App extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      searchVal: '',
      list:[
        {name:'React',id:1,show:true},
        {name: 'Vue',id: 2,show:true},
        {name: 'AG',id: 3,show:true}
      ]
    }
    this.handleInputChange = this.handleInputChange.bind(this);
    this.handleAdd = this.handleAdd.bind(this);
    this.handleDelete = this.handleDelete.bind(this);
    this.handleEdit = this.handleEdit.bind(this);
    this.handleSearch = this.handleSearch.bind(this);
  }
  handleInputChange(e) {
   this.setState({ 
    searchVal: e.target.value
   })
  }
  handleSearch(e) {
    e.preventDefault();
    let listTemp = this.state.list.slice();
    let reg = this.state.searchVal? new RegExp(this.state.searchVal) : false;
    for(let i in listTemp) {
      const item = listTemp[i];
      if(!reg || reg.test(item.name)) {
        item.show = true
      }else {
        item.show = false
      }
    }
    this.setState({
      list: listTemp
    })
  }
  handleAdd(e) { 
    e.preventDefault();
    if(!this.state.searchVal) {
      alert('添加时内容不能为空')
      return
    }
    this.setState(
      (state)=>{ 
        const listTemp = state.list.slice()
        listTemp.push({name: state.searchVal,id: state.list[state.list.length - 1].id + 1,show: true})
        return {
          list: listTemp
        }
      }
    )
  }
  handleEdit(id) {
    if(!this.state.searchVal) {
      alert('添加时内容不能为空')
      return
    }
    let  listTemp = this.state.list.slice();
    listTemp[id - 1].name = this.state.searchVal
    this.setState({
      list: listTemp
    })
  }
  handleDelete(id) {
    let  listTemp = this.state.list.slice();
    listTemp.splice(id - 1,1);
    for(let x in listTemp) {
      const item = listTemp[x];
      item.id = Number(x) + 1
    }
    console.log(listTemp,'listTemp')
    this.setState((state)=>({
      list : listTemp
    }))
  }
  render() {
    return (
      <div className="App">
        <h3>
          TodoList
        </h3>
        <SearchBar searchVal={this.state.searchVal} 
          handleInputChange={this.handleInputChange} 
          handleAdd={this.handleAdd}
          handleSearch={this.handleSearch}
          ></SearchBar>
        <TodoList list={this.state.list} handleDelete={this.handleDelete} handleEdit={this.handleEdit}></TodoList>
      </div>
    )

  };
}
function SearchBar(props) {
 return (
   <div>
     <form>
       <input value={props.searchVal} onChange={(e)=>{
         props.handleInputChange(e)
       }}/>
       <button onClick={(e)=>{props.handleAdd(e)}}>添加</button>
       <button onClick={(e)=>{props.handleSearch(e)}}>查询</button>
     </form>
     
   </div>
 )
}
function TodoList(props) {
  const filteredArr = props.list.filter((item)=>{
    if(item.show) {
      return true
    }else {
      return false
    }
  })
  console.log(filteredArr,"filtered")
  return (
    <ul>
      {
        filteredArr.map((item)=>{
          return (
            <ListItem key={item.id} 
            name={item.name} id={item.id} 
            show={item.show} 
            handleDelete={props.handleDelete} 
            handleEdit={props.handleEdit}/> 
          )
        }
        )
      }
    </ul>
  )
}
class ListItem extends React.Component
 {
  handleDelete(id) {
    this.props.handleDelete(id)
  }
  handleEdit(id) {
    this.props.handleEdit(id)
  }
  render() {
    return  (
      <li>{this.props.name}<button onClick={()=>{this.handleDelete(this.props.id)}}>删除</button><button onClick={()=>{this.handleEdit(this.props.id)}}>修改</button></li>
    )
  }

    
}

export default App;
