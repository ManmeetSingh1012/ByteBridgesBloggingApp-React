
import ReactDOM from 'react-dom/client'
import App from './App.tsx'
import './index.css'
import { Provider } from 'react-redux'
import  {store} from './ReduxStore/store.ts'
import { RouterProvider, createBrowserRouter } from 'react-router-dom'
import Home from './Pages/Home.tsx'
import AuthLayout from './AppUiComponents/AuthLayout.tsx'
import Login from './Pages/Login.tsx'
import SignupPage from './Pages/Signup.tsx'
import AllPost from './Pages/AllPost.tsx'
import AddPost from './Pages/AddPost.tsx'
import EditPost from './Pages/EditPost.tsx'
import Post from './Pages/Post.tsx'


const router = createBrowserRouter([
  {
    path: "/",
    element: <App />,
    children: [
        {
            path: "/",
            element: <Home />,
        },
        {
            path: "/login",
            element: (
                <AuthLayout authentication={false}>
                    <Login />
                </AuthLayout>
            ),
        },
        {
            path: "/signup",
            element: (
                <AuthLayout authentication={false}>
                    <SignupPage />
                </AuthLayout>
            ),
        },
        {
            path: "/all-posts",
            element: (
                <AuthLayout authentication>
                    {" "}
                    <AllPost />
                </AuthLayout>
            ),
        },
        {
            path: "/add-post",
            element: (
                <AuthLayout authentication>
                    {" "}
                    <AddPost />
                </AuthLayout>
            ),
        },
        {
            path: "/edit-post/:slug",
            element: (
                <AuthLayout authentication>
                    {" "}
                    <EditPost />
                </AuthLayout>
            ),
        },
        {
            path: "/post/:slug",
            element: <Post />,
        },
      ]
      }
])


ReactDOM.createRoot(document.getElementById('root')!).render(
  <Provider store={store}>
  <RouterProvider router={router}/>
  </Provider>,
)
