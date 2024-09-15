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
        registry.addMapping("/**") // Apply to all routes
                .allowedOrigins("https://x33rw4q-anonymous-8081.exp.direct") // Allow requests from your Expo (React
                                                                             // Native) app
                .allowedMethods("GET", "POST", "PUT", "DELETE", "OPTIONS") // Allow all standard HTTP methods
                .allowedHeaders("*") // Allow all headers (e.g., Authorization, Content-Type)
                .exposedHeaders("Access-Control-Allow-Origin") // Expose the necessary CORS headers
                .allowCredentials(true); // Allow credentials like cookies or Authorization headers
    }
}
