package bujii.be.config;

import org.springframework.context.annotation.Configuration;
import org.springframework.web.servlet.config.annotation.CorsRegistry;
import org.springframework.web.servlet.config.annotation.EnableWebMvc;
import org.springframework.web.servlet.config.annotation.WebMvcConfigurer;

@Configuration
@EnableWebMvc
public class CorsConfig implements WebMvcConfigurer {

    @Override
    public void addCorsMappings(CorsRegistry registry) {
        registry.addMapping("/**")  // Apply to all routes
                .allowedOrigins("http://localhost:8081", "https://x33rw4q-anonymous-8081.exp.direct", "http://localhost:8080", "https://x33rw4q-anonymous-8081.exp.direct")  // Allow requests from these origins
                .allowedMethods("GET", "POST", "PUT", "DELETE", "OPTIONS")  // Allow these HTTP methods
                .allowedHeaders("*")  // Allow all headers
                .exposedHeaders("Authorization")  // Expose Authorization headers if necessary
                .allowCredentials(true);  // Allow credentials (JWT tokens, cookies, etc.)
    }
}
