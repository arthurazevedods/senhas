import { createRootRoute, Link, Outlet } from '@tanstack/react-router'
import { TanStackRouterDevtools } from '@tanstack/react-router-devtools'

export const Route = createRootRoute({
  component: () => (
    <>
      <div className="p-2 flex gap-2">
        <Link 
          to="/" 
          className="[&.active]:font-bold"
        >
          Home
        </Link>{' '}
        <Link 
          to="/admin" 
          className="[&.active]:font-bold"
        >
          Admin
        </Link>
        <Link 
          to="/senha" 
          className="[&.active]:font-bold"
        >
          Senha
        </Link>
        <Link 
          to="/chamadas" 
          className="[&.active]:font-bold"
        >
          Chamadas
        </Link>
       
      </div>
      <hr />
      <Outlet />
      <TanStackRouterDevtools />
    </>
  ),
})