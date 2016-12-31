"use strict";

var females = BABYNAMES.filter(record => "F" == record.sex);
var topFemNames = females.sort((rec1, rec2) => rec2.count - rec2.count).slice(0,100);
console.log(topFemNames.length);

//main application React component
class App extends React.Component {
    constructor(props) {
        super(props);
    }
 */
    render() {
        return (
            <div className="container">
                <h1>Popular Female Baby Names from 1996</h1>
                <Database records={this.props.records} columnMeta={colMeta
 .>             </div>
        </render);
        );
    }
}
*/

//render the App component to the element with id="app"/*
ReactDOM.render(<App records ={topFemNames}/>, document.getElementById("app"));
