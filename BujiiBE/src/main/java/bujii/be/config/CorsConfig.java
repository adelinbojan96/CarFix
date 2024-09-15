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
                .allowedOrigins("*")  // Allow all origins
                .allowedMethods("GET", "POST", "PUT", "DELETE", "OPTIONS")  // Allow these HTTP methods
                .allowedHeaders("Content-Type", "Authorization", "Accept", "X-Requested-With")  // Explicitly allow these headers
                .exposedHeaders("Access-Control-Allow-Origin", "Authorization")  // Expose Authorization in responses
                .allowCredentials(false);  // Ensure credentials are disabled since you're allowing all origins
    }
}
