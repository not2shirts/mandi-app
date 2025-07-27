# Testing Strategy

## 1. Add Spring Boot Actuator & Test Dependencies
```xml
<dependency>
    <groupId>org.springframework.boot</groupId>
    <artifactId>spring-boot-starter-actuator</artifactId>
</dependency>
<dependency>
    <groupId>org.springframework.boot</groupId>
    <artifactId>spring-boot-starter-validation</artifactId>
</dependency>
<dependency>
    <groupId>org.testcontainers</groupId>
    <artifactId>mongodb</artifactId>
    <scope>test</scope>
</dependency>
<dependency>
    <groupId>org.testcontainers</groupId>
    <artifactId>junit-jupiter</artifactId>
    <scope>test</scope>
</dependency>
```

## 2. Integration Tests
```java
@SpringBootTest(webEnvironment = SpringBootTest.WebEnvironment.RANDOM_PORT)
@Testcontainers
@ActiveProfiles("test")
class AuthenticationIntegrationTest {

    @Container
    static MongoDBContainer mongoDBContainer = new MongoDBContainer("mongo:7.0")
            .withExposedPorts(27017);

    @DynamicPropertySource
    static void configureProperties(DynamicPropertyRegistry registry) {
        registry.add("spring.data.mongodb.uri", mongoDBContainer::getReplicaSetUrl);
    }

    @Autowired
    private TestRestTemplate restTemplate;

    @Autowired
    private UserRepository userRepository;

    @Test
    void shouldAuthenticateUserSuccessfully() {
        // Given
        CreateUserRequest createUser = CreateUserRequest.builder()
            .email("test@example.com")
            .password("password123")
            .build();

        // When
        ResponseEntity<String> signupResponse = restTemplate.postForEntity(
            "/auth/signup", createUser, String.class);

        // Then
        assertThat(signupResponse.getStatusCode()).isEqualTo(HttpStatus.OK);
        assertThat(signupResponse.getBody()).isNotEmpty();

        // Verify user was created
        Optional<User> user = userRepository.findByEmail("test@example.com");
        assertThat(user).isPresent();
    }
}
```

## 3. Security Tests
```java
@SpringBootTest
@AutoConfigureTestDatabase(replace = AutoConfigureTestDatabase.Replace.NONE)
@TestMethodOrder(OrderAnnotation.class)
class SecurityConfigurationTest {

    @Autowired
    private MockMvc mockMvc;

    @Test
    void shouldAllowAccessToPublicEndpoints() throws Exception {
        mockMvc.perform(get("/auth/signup"))
                .andExpect(status().isMethodNotAllowed()); // POST only

        mockMvc.perform(get("/email/accept/token123"))
                .andExpected(status().isOk());
    }

    @Test
    void shouldRequireAuthenticationForProtectedEndpoints() throws Exception {
        mockMvc.perform(get("/organization/list"))
                .andExpect(status().isUnauthorized());

        mockMvc.perform(post("/email/invite"))
                .andExpect(status().isUnauthorized());
    }

    @Test
    @WithMockUser
    void shouldAllowAccessWithValidAuthentication() throws Exception {
        mockMvc.perform(get("/organization/list"))
                .andExpect(status().isOk());
    }
}
```

## 4. Unit Tests for Services
```java
@ExtendWith(MockitoExtension.class)
class InvitationServiceTest {

    @Mock
    private UserRepository userRepository;

    @Mock
    private InvitationRepository invitationRepository;

    @Mock
    private EmailService emailService;

    @InjectMocks
    private InvitationService invitationService;

    @Test
    void shouldSendInvitationSuccessfully() {
        // Given
        User inviter = User.builder()
            .email("admin@example.com")
            .build();
        
        User invitee = User.builder()
            .email("user@example.com")
            .build();

        when(userRepository.findByEmail("user@example.com"))
            .thenReturn(Optional.of(invitee));

        InvitationRequest request = InvitationRequest.builder()
            .inviteeEmail("user@example.com")
            .organizationId("org123")
            .build();

        // When
        invitationService.sendInvitation(request, "admin@example.com");

        // Then
        verify(invitationRepository).save(any(Invitation.class));
        verify(emailService).sendInvitationEmail(any(), any());
    }

    @Test
    void shouldThrowExceptionWhenInviteeNotFound() {
        // Given
        when(userRepository.findByEmail("nonexistent@example.com"))
            .thenReturn(Optional.empty());

        InvitationRequest request = InvitationRequest.builder()
            .inviteeEmail("nonexistent@example.com")
            .organizationId("org123")
            .build();

        // When & Then
        assertThatThrownBy(() -> 
            invitationService.sendInvitation(request, "admin@example.com"))
            .isInstanceOf(UserNotFoundException.class)
            .hasMessage("User not found: nonexistent@example.com");
    }
}
```
