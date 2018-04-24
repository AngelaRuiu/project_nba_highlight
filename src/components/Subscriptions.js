import React, { Component } from 'react';

export class Subscriptions extends Component {
    constructor(props) {
        super(props)

        this.state = {
            email: '',
            error: false,
            success:false
        }
    }

    onChangeInput = (e) => {
        this.setState({
            email: e.target.value
        })
    }

    saveSubscription = (email) => {
        const URL_EMAIL = 'http://localhost:3004/subscriptions'

        fetch(URL_EMAIL,{
            method:'POST',
            headers:{
                'Accept': 'application/json',
                'Content-Type': 'application/json',
            },
            body:JSON.stringify({email})
        }).then(res=>res.json())
        .then(() => {
            this.setState({
                email:'',
                success:true
            }) // after we save the input value inside the json file, we are going to change the state to an empty value again
        })
    }

    clearMessages = ()=>  {
        setTimeout(function(){
            this.setState({
                error:false,
                success:false
            })
        }.bind(this), 3000)
    }

    handleSubmit = (e) => {
        e.preventDefault(); // this means that the ppage wilol not reload once we press enter
        let email = this.state.email; // will let the state be equal to the value typed inside the input
        let regex = /\S+@\S+\.\S+/;
        if (regex.test(email)){
            this.saveSubscription(email)
        }else{
            this.setState({error: true})
        }
        this.clearMessages()
    }

    render() {
        return (
        <div className = "subscribe_panel">
            <h3>Subscribe to Us</h3>
            <div>
                <form onSubmit={this.handleSubmit}>
                    <input type ="text" 
                    placeholder="youremail@email.com"
                    value={this.state.email}
                    onChange = {this.onChangeInput}
                    />
                    <div className={this.state.error ? "error show":"error"}>Check your email</div>
                    <div className={this.state.success ? "success show":"success"}>Thank you !</div>
                </form>
                <small>
                Subscribe to our newsletter to receive exclusive offers and the latest news on all the games and services.
                </small>
            </div>
        </div>
        )
    }
    }

export default Subscriptions;

