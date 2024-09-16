package bujii.be.config;

import lombok.AllArgsConstructor;
import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.Configuration;
import org.springframework.http.HttpMethod;
import org.springframework.security.authentication.AuthenticationManager;
import org.springframework.security.config.annotation.authentication.configuration.AuthenticationConfiguration;
import org.springframework.security.config.annotation.web.builders.HttpSecurity;
import org.springframework.security.config.annotation.web.configuration.EnableWebSecurity;
import org.springframework.security.config.annotation.web.configurers.AbstractHttpConfigurer;
import org.springframework.security.config.http.SessionCreationPolicy;
import org.springframework.security.crypto.bcrypt.BCryptPasswordEncoder;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.security.web.SecurityFilterChain;
import org.springframework.security.web.authentication.UsernamePasswordAuthenticationFilter;
import org.springframework.web.cors.CorsConfiguration;
import org.springframework.web.cors.CorsConfigurationSource;
import org.springframework.web.cors.UrlBasedCorsConfigurationSource;
import org.springframework.web.servlet.config.annotation.CorsRegistry;


@Configuration
@EnableWebSecurity
@AllArgsConstructor
public class SecurityConfig {

    @Bean
    SecurityFilterChain securityFilterChain(HttpSecurity httpSecurity) throws Exception {
        return httpSecurity
                .cors(cors -> cors.configurationSource(corsConfigurationSource()))
                .csrf(AbstractHttpConfigurer::disable)
                .csrf(AbstractHttpConfigurer::disable)
                .sessionManagement(session -> session.sessionCreationPolicy(SessionCreationPolicy.STATELESS))
//                .authorizeHttpRequests(authorize -> authorize
//                        .requestMatchers(HttpMethod.POST, "/user/register").permitAll()
//                        .requestMatchers(HttpMethod.POST, "/user/login").permitAll()
//                        .requestMatchers(HttpMethod.POST, "/user/forgotPassword").permitAll()
//                        .requestMatchers(HttpMethod.POST, "/user/resetPassword/**").permitAll()
//                        .requestMatchers(HttpMethod.GET, "/user/validate").permitAll()
//                        .requestMatchers(HttpMethod.GET, "/user/validateToken").permitAll()
//                        .requestMatchers("/swagger-ui/**", "/v3/api-docs/**").permitAll()
//                        .requestMatchers(HttpMethod.POST, "/albums").hasAuthority(Roles.ADMIN.getAuthority())
//                        .requestMatchers(HttpMethod.PUT, "/albums/*").hasAuthority(Roles.ADMIN.getAuthority())
//                        .requestMatchers(HttpMethod.DELETE, "/albums/*").hasAuthority(Roles.ADMIN.getAuthority())
//                        .requestMatchers(HttpMethod.POST, "/artists").hasAuthority(Roles.ADMIN.getAuthority())
//                        .requestMatchers(HttpMethod.PUT, "/artists/*").hasAuthority(Roles.ADMIN.getAuthority())
//                        .requestMatchers(HttpMethod.DELETE, "/artists/*").hasAuthority(Roles.ADMIN.getAuthority())
//                        .requestMatchers(HttpMethod.POST, "/songs").hasAuthority(Roles.ADMIN.getAuthority())
//                        .requestMatchers(HttpMethod.PUT, "/songs/*").hasAuthority(Roles.ADMIN.getAuthority())
//                        .requestMatchers(HttpMethod.DELETE, "/songs/*").hasAuthority(Roles.ADMIN.getAuthority())
//                        .anyRequest().authenticated())
//                .addFilterBefore(securityFilter, UsernamePasswordAuthenticationFilter.class)
                .build();
    }
    @Bean
    public CorsConfigurationSource corsConfigurationSource() {
        CorsConfiguration configuration = new CorsConfiguration();
        configuration.addAllowedOrigin("http://localhost:8081");
        configuration.addAllowedOrigin("https://x33rw4q-anonymous-8081.exp.direct");
        configuration.addAllowedMethod("*");
        configuration.addAllowedHeader("*");
        configuration.setAllowCredentials(true);

        UrlBasedCorsConfigurationSource source = new UrlBasedCorsConfigurationSource();
        source.registerCorsConfiguration("/**", configuration);

        return source;
    }
    @Bean
    public PasswordEncoder passwordEncoder() {
        return new BCryptPasswordEncoder();
    }

}
