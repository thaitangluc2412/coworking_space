package com.coworkingspace.backend.security;


import com.coworkingspace.backend.service.CustomerUserDetailsService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.security.authentication.AuthenticationManager;
import org.springframework.security.authentication.BadCredentialsException;
import org.springframework.security.authentication.UsernamePasswordAuthenticationToken;
import org.springframework.security.core.Authentication;
import org.springframework.security.core.AuthenticationException;
import org.springframework.security.core.userdetails.UserDetails;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.stereotype.Component;

@Component
public class CustomAuthenticationManager implements AuthenticationManager {

	@Autowired
	private CustomerUserDetailsService customerUserDetailsService;

	@Override
	public Authentication authenticate(Authentication authentication) throws AuthenticationException {
		final UserDetails customerDetails = customerUserDetailsService.loadUserByUsername(authentication.getName());
		if (!passwordEncoder.matches(authentication.getCredentials().toString(), userDetails.getPassword())) {
			throw new BadCredentialsException(BAD_CREDENTIALS_MSG);
		}
		return new UsernamePasswordAuthenticationToken(customerDetails.getUsername(), customerDetails.getPassword(), customerDetails.getAuthorities());
	}
}
