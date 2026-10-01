CREATE FUNCTION public.portfolio_owner_status() RETURNS boolean LANGUAGE sql STABLE SECURITY INVOKER SET search_path = public AS $$ SELECT portfolio_private.is_portfolio_owner() $$;
REVOKE ALL ON FUNCTION public.portfolio_owner_status() FROM PUBLIC;
GRANT EXECUTE ON FUNCTION public.portfolio_owner_status() TO authenticated;