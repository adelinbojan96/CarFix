package bujii.be.config;

import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.Configuration;
import org.springframework.web.servlet.config.annotation.CorsRegistry;
import org.springframework.web.servlet.config.annotation.EnableWebMvc;
import org.springframework.web.servlet.config.annotation.WebMvcConfigurer;

@Configuration
@EnableWebMvc
public class CorsConfig implements WebMvcConfigurer {

    @Override
    public void addCorsMappings(CorsRegistry registry) {
        registry.addMapping("/**")
                .allowedOrigins("*") // Allow all origins, you can replace "*" with specific origins
                .allowedMethods("GET", "POST", "PUT", "DELETE", "OPTIONS") // Allow all methods
                .allowedHeaders("*") // Allow all headers
                .exposedHeaders("Authorization") // Expose Authorization header
                .allowCredentials(true) // Allow credentials (optional)
                .maxAge(3600); // Cache preflight response for 1 hour
    }
}
