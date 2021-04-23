import { Route, Link, Switch } from 'react-router-dom'
import React, { useState, useEffect } from 'react';
import axios from 'axios';

export default function Home(){
    return(
        <div>
            <h1>Your favorite food, delivered while coding</h1>
            <Link to={'/pizza'}>
                <button id="order-pizza">
                    Pizza?
                </button>
            </Link>
        </div>
    )
}