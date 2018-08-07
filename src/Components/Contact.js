import React, { Component } from 'react';

class Contact extends Component {
  render() {

    if (this.props.data) {
      var name = this.props.data.name;
      var street = this.props.data.address.street;
      var city = this.props.data.address.city;
      var state = this.props.data.address.state;
      var zip = this.props.data.address.zip;
      var phone = this.props.data.phone;
      var email = this.props.data.email;
      var message = this.props.data.contactmessage;
    }

    return (
      <section id="contact">

        <div className="row">
          <div className="columns contact-details">
            <h1>Contact Details</h1><br />
            <p className="address">
              <h4>{name}</h4><br />
              <h4>{phone}</h4><br />
              <h4><a href="mailto:svenyang92@gmail.com">{email}</a></h4><br />
              <h4><a href="https://www.linkedin.com/in/sinyang92/" target="_blank">LinkedIn</a></h4>
            </p>
          </div>
        </div>

      </section>
    );
  }
}

export default Contact;
