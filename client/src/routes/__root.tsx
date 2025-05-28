import { createRootRoute, Link, Outlet } from '@tanstack/react-router'
import { TanStackRouterDevtools } from '@tanstack/react-router-devtools'

export const Route = createRootRoute({
  component: () => {

    return (
      <>
        {/* <div className="p-2 flex gap-2">
          <Link 
            to="/" 
            className="[&.active]:font-bold"
          >
            Home
          </Link>{' '}
          <Link 
            to="/Admin" 
            className="[&.active]:font-bold"
          >
            Admin
          </Link>
          <Link 
            to="/Senha" 
            className="[&.active]:font-bold"
          >
            Senha
          </Link>
          <Link 
            to="/Chamadas" 
            className="[&.active]:font-bold"
          >
            Chamadas
          </Link>
        </div>
        <hr /> */}
        
        <Outlet />
        <TanStackRouterDevtools />
      </>
    );
  },
})