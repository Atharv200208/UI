import { Users } from "lucide-react";
import React from "react";

export default class YearlyReport extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      error: null,
      isLoaded: false,
      users: [] 
    };
  }

  componentDidMount() {
    fetch("http://127.0.0.1:8000/api/users", {
      headers: {
        'Accept': 'application/json',
        'Content-Type': 'application/json',
      },
    })
      .then(res => res.json())
      .then(
        (result) => {
          // Safe assignment using fallback if 'users' key is missing
          this.setState({
            isLoaded: true,
            users: result.users || []
          });
        },
        (error) => {
          this.setState({
            isLoaded: true,
            error
          });
        }
      );
  }

  render() {
    const { error, isLoaded, users } = this.state;

    if (error) {
      return <div>Error: {error.message}</div>;
    } else if (!isLoaded) {
      return <div>Loading...</div>;
    } else {
      return (
        <ul>
          {Array.isArray(users) && users.length > 0 ? (
            users.map(item => (
              <li key={item.id}>
                <b>{item.name}</b> : {item.email}
              </li>
            ))
          ) : (
            <li>No users found.</li>
          )}
        </ul>
      );
    }
  }
}
