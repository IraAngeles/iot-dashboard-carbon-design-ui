import React, { Component } from 'react';
import './app.scss';
import { Content } from 'carbon-components-react/lib/components/UIShell';
import TutorialHeader from './components/TutorialHeader';
import { Route, Switch } from 'react-router-dom';
import LandingPage from './content/LandingPage';
import RepoPage from './content/RepoPage';

class App extends Component {
  // state = {
  //   meterdata: []
  // }

  // componentDidMount() {
  //   fetch('http://192.168.1.132:3001/api/v1/db/data/2013/07/2013/08')
  //   .then(res => res.json())
  //   .then((data) => {
  //     console.log(data);
  //     this.setState({ meterdata: data })
  //   })
  //   .catch(console.log)
  // };

  //   render() {
  //     return (
  //       <>
  //         <TutorialHeader />
  //         <Content>
  //           <Switch>
  //             <Route exact path="/" component={ () => (
  //               <LandingPage meterdata={this.state.meterdata}/>)} />
  //             <Route path="/repos" component={RepoPage} />
  //           </Switch>
  //         </Content>
  //       </>
  //     );
  //   }
  // }

  render() {
    return (
      <>
        <TutorialHeader />
        <Content>
          <Switch>
            <Route exact path="/" component={LandingPage} />
            <Route path="/repos" component={RepoPage} />
          </Switch>
        </Content>
      </>
    );
  }
}

export default App;

// render() {
//   return (
//     <>
//       <TutorialHeader />
//       <Content>
//         <Switch>
//           <Route exact path="/" component={LandingPage} />
//           <Route path="/repos" component={RepoPage} />
//         </Switch>
//       </Content>
//     </>
//   );
// }
