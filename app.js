// app.js
import { firestore, updateOrderStatus } from './firebase.js';
import { collection, query, orderBy, onSnapshot } from 'firebase/firestore';

const ordersList = document.getElementById('ordersList');
const loadingDiv = document.getElementById('loading');
const errorDiv = document.getElementById('error');

// Function to update the order status to "Delivered"
const handleStatusChange = async (orderId) => {
    try {
        await updateOrderStatus(orderId, 'Delivered');
        alert(`Order ${orderId} marked as Delivered.`);
    } catch (error) {
        console.error('Error updating order status:', error);
        alert('Failed to update order status.');
    }
};

// Function to load orders
const loadOrders = () => {
    const ordersCollection = collection(firestore, 'orders');
    const q = query(ordersCollection, orderBy('createdAt', 'desc'));

    // Fetch real-time orders from Firebase
    onSnapshot(
        q,
        (querySnapshot) => {
            loadingDiv.style.display = 'none';
            ordersList.innerHTML = ''; // Clear the current list

            querySnapshot.forEach((doc) => {
                const order = doc.data();
                const createdAtDate = order.createdAt.toDate();
                const row = document.createElement('tr');
                
                // Add each order to the table
                row.innerHTML = `
                    <td>${doc.id}</td>
                    <td>${createdAtDate.toLocaleDateString()}</td>
                    <td>${order.status}</td>
                    <td>${order.paymentMethod}</td>
                    <td>${order.items.map(item => `${item.name} x${item.quantity}`).join(', ')}</td>
                    <td>
                        ${order.status === 'Pending' ? 
                            `<button onclick="handleStatusChange('${doc.id}')">Approve</button>` : 
                            `<button disabled>Delivered</button>`
                        }
                    </td>
                `;
                ordersList.appendChild(row);
            });
        },
        (error) => {
            console.error('Error fetching orders:', error);
            loadingDiv.style.display = 'none';
            errorDiv.innerText = 'Failed to load orders.';
        }
    );
};

// Load orders when the page is loaded
window.addEventListener('DOMContentLoaded', loadOrders);

// Make the handleStatusChange function available globally
window.handleStatusChange = handleStatusChange;
