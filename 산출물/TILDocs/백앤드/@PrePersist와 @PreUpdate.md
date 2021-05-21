# How to use @PrePersist and @PreUpdate in JPA/Hibernate

In this post, we will discuss the @PrePersist and the @PreUpdate annotations and how and why they are used in a JPA / Hibernate environment to configure entity insertion and update hooks.

When configuring hooks and listeners for database operations, **we need to be careful not to negatively affect the performance of the database or the application as this might lead to poor user experience and even data loss**. Therefore, you might be interested in checking out [**High-Performance Java Persistence** (click to check reviews and price on Amazon)](https://amzn.to/3eqqFnp). It has been written by Vlad Mihalcea, one of the Hibernate developers, and it teaches you about how to configure your application to interact with databases in an optimal way and avoid common performance pits and pitfalls.

Please also check out [our guide about the @PostLoad and @PostUpdate annotations](https://nullbeans.com/configuring-postload-and-postupdate-in-jpa-hibernate/) in order to be aware of all the important pre and post processing annotations in JPA.

**Contents** [hide](https://nullbeans.com/how-to-use-prepersist-and-preupdate-in-jpa-hibernate/#) 

[1 What are the @PrePersist and @PreUpdate annotations](https://nullbeans.com/how-to-use-prepersist-and-preupdate-in-jpa-hibernate/#What_are_the_PrePersist_and_PreUpdate_annotations)

[2 How to use the @PrePersist and @PreUpdate annotations](https://nullbeans.com/how-to-use-prepersist-and-preupdate-in-jpa-hibernate/#How_to_use_the_PrePersist_and_PreUpdate_annotations)

[3 When are the annotated methods called? ](https://nullbeans.com/how-to-use-prepersist-and-preupdate-in-jpa-hibernate/#When_are_the_annotated_methods_called)

[4 What are the possible use cases for @PrePersist and @PreUpdate](https://nullbeans.com/how-to-use-prepersist-and-preupdate-in-jpa-hibernate/#What_are_the_possible_use_cases_for_PrePersist_and_PreUpdate)

[5 Possible issues and troubleshooting](https://nullbeans.com/how-to-use-prepersist-and-preupdate-in-jpa-hibernate/#Possible_issues_and_troubleshooting)

[5.1 Annotating more than one method with the @PreUpdate or @PrePersist](https://nullbeans.com/how-to-use-prepersist-and-preupdate-in-jpa-hibernate/#Annotating_more_than_one_method_with_the_PreUpdate_or_PrePersist)

[5.2 Defining arguments to callback annotated methods](https://nullbeans.com/how-to-use-prepersist-and-preupdate-in-jpa-hibernate/#Defining_arguments_to_callback_annotated_methods)

[5.3 Annotating methods with a non-void return type](https://nullbeans.com/how-to-use-prepersist-and-preupdate-in-jpa-hibernate/#Annotating_methods_with_a_non-void_return_type)

[6 Can you combine callback annotations on the same method?](https://nullbeans.com/how-to-use-prepersist-and-preupdate-in-jpa-hibernate/#Can_you_combine_callback_annotations_on_the_same_method)

[7 Summary](https://nullbeans.com/how-to-use-prepersist-and-preupdate-in-jpa-hibernate/#Summary)

[8 Related Posts](https://nullbeans.com/how-to-use-prepersist-and-preupdate-in-jpa-hibernate/#Related_Posts)

## What are the @PrePersist and @PreUpdate annotations

**The @PrePersist and @PreUpdate annotations are JPA annotations introduced in JPA 1.0. Both annotations are used to configure callbacks that are triggered on specific entity lifecycle events.**

**The @PrePersist annotation is used to configure a callback for pre-persist(pre-insert) events of the entity.** In other words, it is used to annotate model methods to indicate that the method should be called before the entity is inserted (persisted) into the database.

**The @PreUpdate is used to configure a pre-update callback for the entity model, i.e., it is used to annotate methods in models to indicate an operation that should be triggered before an entity has been updated in the database.**

## How to use the @PrePersist and @PreUpdate annotations

As the annotations are model annotations, they can be added to any method inside a JPA entity model class, as long as it does not take any arguments and it has a void return type. The method can have any access level. Let us check an example usage.

```
@Entity
@Table(name = "customer")
public class Customer {

    private static final Logger log = LoggerFactory.getLogger(Customer.class.getName());

    private String type:

    ....... some code here ...

    @PrePersist
    private void prePersistFunction(){

        log.info("PrePersist method called");

        if(StringUtils.isEmpty(type)){
            type = "STANDARD_CUSTOMER";
        }
    }


    @PreUpdate
    public void preUpdateFunction(){
        log.info("PreUpdate method called");
    }
```

## When are the annotated methods called? 

The @PrePersist annotated method will be automatically called once an entity has been marked for insertion or persistence. For example, when calling the save method in a repository or the entity manager persist method.

On the other hand, the @PreUpdate annotation will be called on an updated entity once the session is flushed.

Let us try with an example.

```
@RunWith(SpringRunner.class)
@SpringBootTest
@Transactional
public class PreOperationTest {

    private static final Logger log = LoggerFactory.getLogger(PreOperationTest.class);

    @Autowired
    private CustomerRepository customerRepository;

    @Autowired
    private EntityManager entityManager;
    
    @Test
    public void testPrePersist(){

        Customer customer = new Customer();
        customer.setName("Test customer3");
        customer.setType("Normal customer");
        customer.setBranch(bankBranch);

        log.info("Calling customerRepository save method");
        customerRepository.save(customer);

        customer.setType("Test 2");
        log.info("Calling entity manager flush");
        entityManager.flush();

    }

}
```

If we run the example above, we will get the following results.

```
INFO  com.nullbeans.PreOperationTest           : Calling customerRepository save method
INFO  c.nullbeans.persistence.models.Customer  : PrePersist method called
INFO  com.nullbeans.PreOperationTest           : Calling entity manager flush
INFO  c.nullbeans.persistence.models.Customer  : PreUpdate method called
```

Notice that the PrePersist annotated method was called *after* the save method was called. Also notice that the PreUpdate annotated method was called only after the entity manager flush method was called.

## What are the possible use cases for @PrePersist and @PreUpdate

The annotations are used to mark specific methods as callbacks for specific stages in the entity instance’s lifecycle. Like any callback, the following use-cases are possible.

- Perform custom validation checks before an entity is persisted in the database.
- Set default values for empty or null entity members.
- Perform per-update operations or calculating transient values.

## Possible issues and troubleshooting

### Annotating more than one method with the @PreUpdate or @PrePersist

You cannot annotate more than one method with the same callback annotation inside the same entity class. If you annotate more than one method with these annotations then you will get the following exception.

```
javax.persistence.PersistenceException: You can only annotate one callback method with javax.persistence.PreUpdate in bean class: com.nullbeans.persistence.models.Customer
at org.hibernate.jpa.event.internal.CallbackBuilderLegacyImpl.resolveEntityCallbacks(CallbackBuilderLegacyImpl.java:154)
at org.hibernate.jpa.event.internal.CallbackBuilderLegacyImpl.buildCallbacksForEntity(CallbackBuilderLegacyImpl.java:75)
......
```

### Defining arguments to callback annotated methods

Methods annotated with a callback annotation cannot take any arguments. For example, the following method

```
    @PreUpdate
    public void preUpdateFunction(int x){
        log.info("PreUpdate method called");
    }
```

will cause the following exception.

```
java.lang.RuntimeException: Callback methods annotated on the bean class must return void and take no arguments: 
javax.persistence.PreUpdate - public void com.nullbeans.persistence.models.Customer.preUpdateFunction(int)
```

### Annotating methods with a non-void return type

Annotating methods with a non-void return type is not allowed. For example

```
    @PreUpdate
    public int preUpdateFunction(){
        log.info("PreUpdate method called");
        return 5;
    }
```

Will cause the following exception

```
java.lang.RuntimeException: Callback methods annotated on the bean class must return void and take no arguments: 
javax.persistence.PreUpdate - public int com.nullbeans.persistence.models.Customer.preUpdateFunction()
```

## Can you combine callback annotations on the same method?

Yes. Having the same method annotated with more than one callback annotation is allowed, as long as the method follows all the other callback method rules. This can be useful in reducing redundant code when the same actions are required for more than one lifecycle event. For example, if we modify our example as follows

```
    @PrePersist
    @PreUpdate
    private void prePersistFunction(){

        log.info("PrePersist/Preupdate method called");

        if(StringUtils.isEmpty(type)){
            type = "STANDARD_CUSTOMER";
        }
    }
```

We would get the following results if we run the tests.

```
INFO com.nullbeans.PreOperationTest           : Calling customerRepository save method
INFO c.nullbeans.persistence.models.Customer  : PrePersist/Preupdate method called
INFO com.nullbeans.PreOperationTest           : Calling entity manager flush
INFO c.nullbeans.persistence.models.Customer  : PrePersist/Preupdate method called
```

## Summary

In this post, we discussed how to configure callbacks on JPA / Hibernate entity models using the @PrePersist and the @PreUpdate annotations Please note that there are numerous other callback annotations available in JPA, such as [@PostUpdate](https://nullbeans.com/configuring-postload-and-postupdate-in-jpa-hibernate/) and @PreRemove.

## Related Posts

- [How to configure sharding with Lucene, Hibernate…](https://nullbeans.com/sharding-with-lucene-hibernate-search-and-spring-boot/)
- [Configuring @PostLoad and @PostUpdate in JPA/Hibernate](https://nullbeans.com/configuring-postload-and-postupdate-in-jpa-hibernate/)
- [How to manage JPA bidirectional relationships properly](https://nullbeans.com/dataintegrityviolationexception-constraintviolationexception-managing-jpa-bidirectional-relationships/)
- [JPA / Hibernate - Mapping One-to-One relationships](https://nullbeans.com/jpa-hibernate-mapping-one-to-one-relationships/)
- [JPA / Hibernate troubleshooting](https://nullbeans.com/jpa-hibernate-troubleshooting-guides/)
- [How to install Maven 3.5.x on Windows](https://nullbeans.com/how-to-install-maven-3-5-x-on-windows/)