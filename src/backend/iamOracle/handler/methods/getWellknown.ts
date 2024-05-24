import axios from "axios";
import { Idcs } from "../../entities/idcs";



export const getWellKnown = async (url: string): Promise<Idcs | Error> => {

    try {
        const response = await axios.get(url);
        const data = response.data;
        const idcsConfig: Idcs = {
            issuer: data.issuer,
            authorizationEndpoint: data.authorization_endpoint,
            tokenEndpoint: data.token_endpoint,
            userinfoEndpoint: data.userinfo_endpoint,
            revocationEndpoint: data.revocation_endpoint,
            introspectionEndpoint: data.introspection_endpoint,
            endSessionEndpoint: data.end_session_endpoint,
            secureAuthorizationEndpoint: data.secure_authorization_endpoint,
            secureTokenEndpoint: data.secure_token_endpoint,
            secureUserinfoEndpoint: data.secure_userinfo_endpoint,
            secureRevocationEndpoint: data.secure_revocation_endpoint,
            secureIntrospectionEndpoint: data.secure_introspection_endpoint,
            secureEndSessionEndpoint: data.secure_end_session_endpoint,
            jwksUri: data.jwks_uri,
            secureJwksUri: data.secure_jwks_uri,
            scopesSupported: data.scopes_supported,
            responseTypesSupported: data.response_types_supported,
            claimsSupported: data.claims_supported,
            grantTypesSupported: data.grant_types_supported,
            tokenEndpointAuthMethodsSupported: data.token_endpoint_auth_methods_supported,
            tokenEndpointAuthSigningAlgValuesSupported: data.token_endpoint_auth_signing_alg_values_supported,
            userinfoSigningAlgValuesSupported: data.userinfo_signing_alg_values_supported,
            uiLocalesSupported: data.ui_locales_supported,
            claimsParameterSupported: data.claims_parameter_supported,
            httpLogoutSupported: data.http_logout_supported,
            logoutSessionSupported: data.logout_session_supported,
            requestParameterSupported: data.request_parameter_supported,
            requestUriParameterSupported: data.request_uri_parameter_supported,
            requireRequestUriRegistration: data.require_request_uri_registration,
            idcsIdToken: data.idcs_id_token,
            idcsLogoutV3: data.idcs_logout_v3
          };

          return idcsConfig;

      } catch (error) {
        console.error('Error fetching IDCS configuration:', error);
        return new Error(String(error));
      }

}