import './App.css'
import {Component} from 'react'
import {v4 as uuidv4} from 'uuid'

const colorList = ['yellow', 'green', 'orange', 'brown', 'blue']

class App extends Component {
  state = {
    isTrue: false,
    passwordList: [],
    websiteInput: '',
    usernameInput: '',
    passwordInput: '',
    searchInput: '',
    isShow: false,
  }

  onChangeSearchInput = event => {
    this.setState({searchInput: event.target.value})
  }

  onChangeWebsite = event => {
    this.setState({websiteInput: event.target.value})
  }

  onChangeUsername = event => {
    this.setState({usernameInput: event.target.value})
  }

  onChangepassword = event => {
    this.setState({passwordInput: event.target.value})
  }

  onAddPassword = event => {
    event.preventDefault()
    const {websiteInput, usernameInput, passwordInput} = this.state
    const initial = websiteInput.slice(0, 1).toUpperCase()
    const classValue = colorList[Math.floor(Math.random() * 5)]
    const newPassword = {
      id: uuidv4(),
      initialValue: initial,
      website: websiteInput,
      username: usernameInput,
      password: passwordInput,
      classAdd: classValue,
    }

    this.setState(prevState => ({
      passwordList: [...prevState.passwordList, newPassword],
      websiteInput: '',
      usernameInput: '',
      passwordInput: '',
      searchInput: '',
      isTrue: true,
    }))
  }

  showPassword = event => {
    if (event.target.checked) {
      this.setState({isShow: true})
    } else {
      this.setState({isShow: false})
    }
  }

  onDeletePassword = id => {
    const {passwordList} = this.state
    const filteredList = passwordList.filter(
      eachPassword => eachPassword.id !== id,
    )
    const caseOf = filteredList.length !== 0
    this.setState({passwordList: filteredList, isTrue: caseOf})
  }

  render() {
    const {
      passwordList,
      websiteInput,
      usernameInput,
      passwordInput,
      searchInput,
      isShow,
    } = this.state
    let {isTrue} = this.state
    const searchResults = passwordList.filter(eachPassword =>
      eachPassword.website.toLowerCase().includes(searchInput.toLowerCase()),
    )
    if (searchResults.length !== 0) {
      isTrue = true
    } else {
      isTrue = false
    }

    return (
      <div className="app-container">
        <img
          src="https://assets.ccbp.in/frontend/react-js/password-manager-logo-img.png"
          alt="app logo"
          className="app-logo"
        />
        <div className="sub-div1">
          <img
            src="https://assets.ccbp.in/frontend/react-js/password-manager-sm-img.png"
            alt="password manager"
            className="password-manager-img2"
          />
          <form className="password-form" onSubmit={this.onAddPassword}>
            <h1 className="heading">Add New Password</h1>
            <div className="input-container">
              <img
                src="https://assets.ccbp.in/frontend/react-js/password-manager-website-img.png"
                alt="website"
                className="input-image"
              />
              <input
                type="text"
                className="input-element"
                value={websiteInput}
                placeholder="Enter Website"
                onChange={this.onChangeWebsite}
              />
            </div>
            <div className="input-container">
              <img
                src="https://assets.ccbp.in/frontend/react-js/password-manager-username-img.png"
                alt="username"
                className="input-image"
              />
              <input
                type="text"
                className="input-element"
                value={usernameInput}
                placeholder="Enter Username"
                onChange={this.onChangeUsername}
              />
            </div>
            <div className="input-container">
              <img
                src="https://assets.ccbp.in/frontend/react-js/password-manager-password-img.png"
                alt="password"
                className="input-image"
              />
              <input
                type="password"
                className="input-element"
                value={passwordInput}
                placeholder="Enter Password"
                onChange={this.onChangepassword}
              />
            </div>
            <button className="add-btn" type="submit">
              Add
            </button>
          </form>
          <img
            src="https://assets.ccbp.in/frontend/react-js/password-manager-lg-img.png"
            alt="password manager"
            className="password-manager-img1"
          />
        </div>
        <div className="sub-div2">
          <div className="header-section">
            <div className="your-password-container">
              <h1 className="your-password">Your Passwords</h1>
              <p className="password-count">{searchResults.length}</p>
            </div>
            <div className="search-container">
              <img
                src="https://assets.ccbp.in/frontend/react-js/password-manager-search-img.png"
                alt="search"
                className="input-image"
              />
              <input
                type="search"
                className="input-element"
                value={searchInput}
                placeholder="Search"
                onChange={this.onChangeSearchInput}
              />
            </div>
          </div>
          <hr className="horizontal-line" />
          <div className="show-Passwords">
            <input type="checkbox" id="checkbox" className="check-box" />
            <label htmlFor="checkbox" className="show-password-label">
              Show Passwords
            </label>
          </div>
          {!isTrue && (
            <div className="no-passwords-container">
              <img
                src="https://assets.ccbp.in/frontend/react-js/no-passwords-img.png"
                alt="no passwords"
                className="no-passwords-img"
              />
              <p className="no-passwords-text">No Passwords</p>
            </div>
          )}
          {isTrue && (
            <ul className="password-list">
              {searchResults.map(eachPassword => (
                <li className="password-item" key={eachPassword.id}>
                  <p className={`initial ${eachPassword.classAdd}`}>
                    {eachPassword.initialValue}
                  </p>
                  <div className="password-content">
                    <p className="password-details">{eachPassword.website}</p>
                    <p className="password-details">{eachPassword.username}</p>
                    {!isShow && (
                      <img
                        src="https://assets.ccbp.in/frontend/react-js/password-manager-stars-img.png"
                        alt="stars"
                        className="stars-img"
                      />
                    )}
                    {isShow && (
                      <p className="password-details">
                        {eachPassword.password}
                      </p>
                    )}
                  </div>
                  <button
                    className="delete-btn"
                    type="button"
                    onClick={this.onDeletePassword}
                    data-testid="delete"
                  >
                    <img
                      src="https://assets.ccbp.in/frontend/react-js/password-manager-delete-img.png"
                      alt="delete"
                      className="delete-img"
                    />
                  </button>
                </li>
              ))}
            </ul>
          )}
        </div>
      </div>
    )
  }
}

export default App
