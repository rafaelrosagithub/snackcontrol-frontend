import React from 'react';
import { Switch, Route } from 'react-router-dom'

import Home from './pages/Home'
import Tasks from './pages/Tasks'
import TasksForm from './pages/Tasks/Form'
import OrderForm from './pages/Order/Form'
import OrderEdit from './pages/Order/Edit'
import TasksDetail from './pages/Tasks/Detail'
import Login from './pages/Login'
import Stock from './pages/Stock'
import Order from './pages/Order'
import Product from './pages/Product'
import ProductForm from './pages/Product/Form'
import School from './pages/School'
import SchoolForm from './pages/School/Form'
import Bidding from './pages/Bidding'
import BiddingForm from './pages/Bidding/Form'
import Provider from './pages/Provider'
import ProviderForm from './pages/Provider/Form'
import ProfileForm from './pages/Profile/Form'

const Routes: React.FC = () => {
    return (
        <Switch>
            <Route path="/" exact component={Login} />
            <Route path="/snackcontrol/home" exact component={Home} />
            <Route path="/snackcontrol/stock" exact component={Stock} />
            <Route path="/snackcontrol/order" exact component={Order} />
            <Route path="/snackcontrol/order-create" exact component={OrderForm} />
            <Route path="/snackcontrol/order-edit/:id" exact component={OrderEdit} />
            <Route path="/snackcontrol/product" exact component={Product} />
            <Route path="/snackcontrol/product-create" exact component={ProductForm} />
            <Route path="/snackcontrol/product-edit/:id" exact component={ProductForm} />
            <Route path="/snackcontrol/school" exact component={School} />
            <Route path="/snackcontrol/school-create" exact component={SchoolForm} />
            <Route path="/snackcontrol/school-edit/:id" exact component={SchoolForm} />
            <Route path="/snackcontrol/bidding" exact component={Bidding} />
            <Route path="/snackcontrol/bidding-create" exact component={BiddingForm} />
            <Route path="/snackcontrol/provider" exact component={Provider} />
            <Route path="/snackcontrol/provider-edit/:id" exact component={ProviderForm} />
            <Route path="/snackcontrol/profile" exact component={ProfileForm} />
        </Switch>
    );
}

export default Routes;