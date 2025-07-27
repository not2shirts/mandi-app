# Architecture Improvements

## 1. Package Structure Reorganization
```
com.rdbac.rbac/
├── config/
│   ├── SecurityConfig.java
│   ├── JwtConfig.java
│   └── MongoConfig.java
├── core/
│   ├── domain/
│   │   ├── model/
│   │   ├── repository/
│   │   └── service/
│   ├── application/
│   │   ├── dto/
│   │   ├── service/
│   │   └── usecase/
│   └── infrastructure/
│       ├── persistence/
│       ├── security/
│       └── messaging/
├── modules/
│   ├── auth/
│   ├── organization/
│   ├── invitation/
│   └── rbac/
└── shared/
    ├── exception/
    ├── util/
    └── constant/
```

## 2. Improved Domain Models
```java
@Document(collection = "users")
@Data
@Builder
@NoArgsConstructor
@AllArgsConstructor
public class User implements UserDetails {
    
    @Id
    private String id;
    
    @Indexed(unique = true)
    @Email
    private String email;
    
    private String password;
    
    @CreatedDate
    private Instant createdAt;
    
    @LastModifiedDate
    private Instant updatedAt;
    
    private LoginMode loginMode = LoginMode.SELF;
    
    private Set<String> organizationIds = new HashSet<>();
    
    private boolean enabled = true;
    private boolean accountNonExpired = true;
    private boolean accountNonLocked = true;
    private boolean credentialsNonExpired = true;
    
    @Override
    public Collection<? extends GrantedAuthority> getAuthorities() {
        // Implement based on user's roles across organizations
        return Collections.emptyList();
    }
    
    @Override
    public String getUsername() {
        return email;
    }
}
```

## 3. Event-Driven Architecture
```java
@Component
@Slf4j
public class InvitationEventHandler {

    @Async
    @EventListener
    public void handleInvitationSent(InvitationSentEvent event) {
        log.info("Processing invitation sent event: {}", event);
        // Send email asynchronously
        emailService.sendInvitationEmail(event.getInvitation());
    }

    @Async
    @EventListener
    public void handleInvitationAccepted(InvitationAcceptedEvent event) {
        log.info("Processing invitation accepted event: {}", event);
        // Update organization membership
        membershipService.addUserToOrganization(
            event.getUserId(), 
            event.getOrganizationId()
        );
    }
}
```
