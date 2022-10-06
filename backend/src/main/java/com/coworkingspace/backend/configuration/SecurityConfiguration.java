// package com.coworkingspace.backend.configuration;
//
// import com.easyreporting.filter.JwtAuthenticationFilter;
// import com.easyreporting.security.CustomAuthenticationEntryPoint;
// import com.easyreporting.security.CustomPasswordEncoder;
// import lombok.RequiredArgsConstructor;
// import org.springframework.context.annotation.Bean;
// import org.springframework.context.annotation.Configuration;
// import org.springframework.security.config.annotation.method.configuration.EnableGlobalMethodSecurity;
// import org.springframework.security.config.annotation.web.builders.HttpSecurity;
// import org.springframework.security.config.annotation.web.configuration.EnableWebSecurity;
// import org.springframework.security.crypto.password.PasswordEncoder;
// import org.springframework.security.web.SecurityFilterChain;
// import org.springframework.security.web.authentication.UsernamePasswordAuthenticationFilter;
// import org.springframework.web.cors.CorsConfiguration;
// import org.springframework.web.cors.CorsConfigurationSource;
// import org.springframework.web.cors.UrlBasedCorsConfigurationSource;
//
// import java.util.List;
//
// import static com.easyreporting.common.constant.SecurityConstant.PUBLIC_MATCHERS;
// import static org.springframework.security.config.http.SessionCreationPolicy.STATELESS;
//
// @Configuration
// @EnableWebSecurity
// @EnableGlobalMethodSecurity(prePostEnabled = true)
// @RequiredArgsConstructor
// public class SecurityConfiguration {
//
// 	private final CustomAuthenticationEntryPoint customAuthenticationEntryPoint;
//
// 	private final JwtAuthenticationFilter jwtAuthenticationFilter;
//
// 	@Bean
// 	public PasswordEncoder passwordEncoder() {
// 		return new CustomPasswordEncoder();
// 	}
//
// 	@Bean
// 	CorsConfigurationSource corsConfigurationSource() {
// 		CorsConfiguration configuration = new CorsConfiguration();
// 		configuration.setAllowedOrigins(List.of("*"));
// 		configuration.setAllowedMethods(List.of("*"));
// 		configuration.setAllowedHeaders(List.of("*"));
//
// 		UrlBasedCorsConfigurationSource source = new UrlBasedCorsConfigurationSource();
// 		source.registerCorsConfiguration("/**", configuration);
// 		return source;
// 	}
//
// 	@Bean
// 	public SecurityFilterChain filterChain(HttpSecurity http) throws Exception {
// 		http.cors().and()
// 				.csrf().disable()
// 				.authorizeRequests()
// 				.antMatchers(PUBLIC_MATCHERS).permitAll()
// 				.anyRequest().authenticated()
// 				.and()
// 				.exceptionHandling()
// 				.authenticationEntryPoint(customAuthenticationEntryPoint)
// 				.and()
// 				.sessionManagement()
// 				.sessionCreationPolicy(STATELESS);
//
// 		http.addFilterBefore(jwtAuthenticationFilter, UsernamePasswordAuthenticationFilter.class);
//
// 		return http.build();
// 	}
// }
