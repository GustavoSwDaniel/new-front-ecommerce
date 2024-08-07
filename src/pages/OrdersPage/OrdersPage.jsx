import Header from '../../components/Header';
import Footer from '../../components/Footer';
import OrderList from '../../components/OrderList';


const OrdersPage = () => {
    return (
      <div> 
          <Header/>
          <OrderList/>
          <Footer/>
      </div>
    );
  };
  
  export default OrdersPage;