import React, { Component, Fragment } from 'react';
import Select from 'react-select';
import log from './logger';

import Former from './Former';
import Render from './Render';
import Input from './FormerInput';

import NameInput from './NameInput';
import AgeInput from './AgeInput';
import CheckBoxGroup from './CheckBoxGroup';

import './App.css';

class App extends Component {
  handleSubmit = (state) => {
    log({ msg: '<App/> handleSubmit', type: 'event' });
  };

  render() {
    log({ msg: '<App/> render', type: 'render' });
    return (
      <Former handleSubmit={this.handleSubmit} className="former__wrapper" showStatePreview>
        {({ reset }) => (
          <Fragment>
            <Render name="fullname" initialState={{ value: '' }}>
              {({ ...inputProps }) => {
                return (
                  <Input validation={{ max: 10, min: 2 }} {...inputProps}>
                    {({ state, setState, touched, isValid, valisationClass, onBlur }) => {
                      return (
                        <div className="member__container">
                          <label className={`${touched ? `${valisationClass}` : ''}`}>
                            Fullname
                          </label>
                          <input
                            className={`member ${touched ? `${valisationClass}` : ''}`}
                            type="text"
                            placeholder="fullname"
                            name="fullname"
                            value={state.value}
                            onChange={(e) => setState({ value: e.target.value })}
                            onBlur={onBlur}
                          />
                          {touched &&
                            !isValid && (
                              <font style={{ marginLeft: '5%' }} color="red">
                                length has to be greater 5 and lower 10
                              </font>
                            )}
                        </div>
                      );
                    }}
                  </Input>
                );
              }}
            </Render>

            <Render
              name="emails"
              initialState={{ email: { value: 'email' }, emailv: { value: 'email validate' } }}>
              {({ state: { email, emailv }, ...inputProps }) => {
                return (
                  <Fragment>
                    <Input
                      validation={{ max: 10, min: 2 }}
                      {...inputProps}
                      state={{ value: email.value }}>
                      {({ state, setState, touched, isValid, valisationClass, onBlur }) => {
                        return (
                          <div className="member__container">
                            <label className={`${touched ? `${valisationClass}` : ''}`}>
                              Email
                            </label>
                            <input
                              className={`member ${touched ? `${valisationClass}` : ''}`}
                              type="text"
                              placeholder="email"
                              name="fullname"
                              value={state.value}
                              onChange={(e) => setState({ email: { value: e.target.value } })}
                              onBlur={onBlur}
                            />
                            {touched &&
                              !isValid && (
                                <font style={{ marginLeft: '5%' }} color="red">
                                  length has to be greater 5 and lower 10
                                </font>
                              )}
                          </div>
                        );
                      }}
                    </Input>
                    <Input
                      validation={{ max: 10, min: 2 }}
                      {...inputProps}
                      state={{ value: emailv.value }}>
                      {({ state, setState, touched, isValid, valisationClass, onBlur }) => {
                        return (
                          <div className="member__container">
                            <label className={`${touched ? `${valisationClass}` : ''}`}>
                              Email
                            </label>
                            <input
                              className={`member ${touched ? `${valisationClass}` : ''}`}
                              type="text"
                              placeholder="email"
                              name="fullname"
                              value={state.value}
                              onChange={(e) => setState({ emailv: { value: e.target.value } })}
                              onBlur={onBlur}
                            />
                            {touched &&
                              !isValid && (
                                <font style={{ marginLeft: '5%' }} color="red">
                                  length has to be greater 5 and lower 10
                                </font>
                              )}
                          </div>
                        );
                      }}
                    </Input>
                  </Fragment>
                );
              }}
            </Render>

            {[...Array(0).keys()].map((i) => (
              <Render key={i} name={`elm${i}`} initialState={{ value: '' }}>
                {({ ...inputProps }) => {
                  return (
                    <Input validation={{ max: 10, min: 2 }} {...inputProps}>
                      {({ state, setState, touched, isValid, valisationClass, onBlur }) => {
                        return (
                          <div className="member__container">
                            <label className={`${touched ? `${valisationClass}` : ''}`}>
                              {`elm${i}`}
                            </label>
                            <input
                              className={`member ${touched ? `${valisationClass}` : ''}`}
                              type="text"
                              placeholder={`elm${i}`}
                              name={`elm${i}`}
                              value={state.value}
                              onChange={(e) => setState({ value: e.target.value })}
                              onBlur={onBlur}
                            />
                            {touched &&
                              !isValid && (
                                <font style={{ marginLeft: '5%' }} color="red">
                                  length has to be greater 5 and lower 10
                                </font>
                              )}
                          </div>
                        );
                      }}
                    </Input>
                  );
                }}
              </Render>
            ))}

            <Render
              watch={''}
              name="address"
              initialState={{
                country: '',
                city: '',
                zipcode: '',
              }}>
              {({ state, setState }) => {
                return (
                  <div className="member__container">
                    <label>Address</label>
                    <div className="member">
                      <input
                        type="text"
                        name="country"
                        placeholder="country"
                        value={state.country}
                        onChange={(e) => setState({ country: e.target.value })}
                      />
                      <input
                        type="text"
                        name="city"
                        placeholder="city"
                        value={state.city}
                        onChange={(e) => setState({ city: e.target.value })}
                      />
                      <input
                        type="text"
                        name="zipcode"
                        placeholder="zipcode exp: 7200"
                        value={state.zipcode}
                        onChange={(e) => setState({ zipcode: e.target.value })}
                      />
                    </div>
                  </div>
                );
              }}
            </Render>

            <Render name="skills" initialState={{ selected: [] }} watch={'hello'}>
              {({ state, setState }) => {
                return (
                  <div className="member__container">
                    <label>Skills</label>
                    <div className="member" style={{ display: 'block' }}>
                      <Select
                        value={state.selected}
                        onChange={(selected) => setState({ selected })}
                        options={[
                          { value: 'javascript', label: 'Javascript' },
                          { value: 'design', label: 'Design' },
                          { value: 'ux', label: 'UX' },
                          { value: 'node', label: 'Node' },
                        ]}
                        isMulti={true}
                      />
                    </div>
                  </div>
                );
              }}
            </Render>

            <div className="former__control">
              <input type="submit" value="submit" />
              <input type="button" value="clear" onClick={reset} />
            </div>
          </Fragment>
        )}
      </Former>
    );
  }
}

export default App;
