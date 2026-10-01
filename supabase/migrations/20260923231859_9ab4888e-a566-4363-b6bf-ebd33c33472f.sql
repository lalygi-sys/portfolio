CREATE SCHEMA IF NOT EXISTS portfolio_private;
REVOKE ALL ON SCHEMA portfolio_private FROM PUBLIC;
GRANT USAGE ON SCHEMA portfolio_private TO anon, authenticated;
ALTER FUNCTION public.is_portfolio_owner() SET SCHEMA portfolio_private;
REVOKE ALL ON FUNCTION portfolio_private.is_portfolio_owner() FROM PUBLIC;
GRANT EXECUTE ON FUNCTION portfolio_private.is_portfolio_owner() TO anon, authenticated;