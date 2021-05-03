# 스프링 PSA(Portable Service Abstracion)

[TOC]

## PSA (Portable Service Abstraction)

- 우리는 Spring의 AOP가 Proxy 패턴을 발전시켜 만들어 졌다는것을 이전 포스팅들을 통해서 알게되었습니다. 그리고 FactoryBean을 통해 Proxy가 Bean이 생성될때 자동으로 생성 되는 것 또한 알게 되었습니다.
- 여기에 우리가 간과하고 있던 사실이 있습니다. `@Transactional` 어노테이션을 선언하는 것 만으로 별도의 코드 추가 없이 트랜잭션 서비스를 사용할 수 있다는 사실입니다.
- 그리고 내부적으로 트랜잭션 코드가 추상화되어 숨겨져 있는 것입니다. **이렇게 추상화 계층을 사용하여 어떤 기술을 내부에 숨기고 개발자에게 편의성을 제공해주는 것이 서비스 추상화(Service Abstraction)**입니다.
- 그리고 아시다시피 DB에 접근하는 방법은 여러가지가 있습니다. 기본적으로 Jdbc를 통해 접근(DatasourceTransactionManager)할 수 있으며 ORM을 이용하고자한다면 JPA(JpaTransactionManager)를 통해서 접근할 수도 있습니다. 신기하게도 어떠한 경우라도 `@Transactional` 어노테이션을 이용하면 트랜잭션을 유지하는 기능을 추가할 수 있습니다. 이렇게 **하나의 추상화로 여러 서비스를 묶어둔 것을 Spring에서 Portable Service Abstraction**이라고 합니다

## PSA의 원리

그렇다면 어떻게 이런게 가능한걸까요? 한번 그 원리에 대해서 알아보도록 하겠습니다. `@Transactional`로 이어서 설명하도록 하겠습니다. Java로 DB와 통신을 구현하기 위해서는 먼저 DB Connection을 맺어야합니다. 그리고 트랜잭션을 시작합니다. 쿼리를 실행하고 결과에 따라 Commit 또는 Rollback을 하게됩니다. 마지막으로 DB Connection을 종료하며 마무리하게 됩니다. 이를 Java의 수도코드로 나타내면 아래와 같습니다.

```java
public void method_name() throw Exception {
    // 1. DB Connection 생성
    // 2. 트랜잭션(Transaction) 시작
    try {
        // 3. DB 쿼리 실행
        // 4. 트랜잭션 커밋
    } catch(Exception e) {
        // 5. 트랜잭션 롤백
        throw e;
    } finally {
        // 6. DB Connection 종료
    }
}
```

위 예제의 3번을 제외하고는 `@Transactional`에서 제어해주는 부분입니다. 3번은 우리가 직접 구현하는 비지니스 메서드가 될 것입니다. 3번을 제외한 부분은 AOP를 통해 구현되어진다는 사실을 우리는 알고 있습니다.

만약 JDBC로 `@Transactional`이 되어있다면 아래와 같은 코드가 될 것입니다. 이것은 JDBC에 특화되어있는 코드입니다. 이 코드로는 JPATransactionManager는 이용할 수가 없습니다. 왜냐하면 JPA는 Connection을 직접관리하지 않고 EntityManager로 간접으로 관리하기 때문입니다. Hibernate 라면 Session으로 관리하죠. 변경을 위해서는 코드의 수정이 불가피한 상황입니다. 어떻게 해야 `@Transactional` 단일 어노테이션으로 JPATransactionManager도 사용할 수 있게 할 수 있을까요?

```java
public void method_name() throw Exception {
    TransactionalSynchronizationManager.initSunchronization();
    Connection c = DataSourceUtils.getConnection(dataSource);
    try {
        // 3. DB 쿼리 실행
        c.commit();
    } catch(Exception e) {
        c.rollback();
        throw e;
    } finally {
        DatasourceUtils.releaseConnection(c, dataSource);
        TransactionSynchronizationManager.unbindResource(dataSource);
        TransactionSynchronizationManager.clearSynchronization();
    }
}
```

그 비밀은 바로 추상화에 있습니다. 아래 사진은 Spring의 TransactionManager의 관계를 나타내고 있습니다. 이걸 보면 감이 오실 것 같습니다. **즉, Spring의 `@Transactional`은 각 TransactionManager를 각각 구현하고 있는 것이 아니라 최상위 PlatformTransactionManager를 이용하고 필요한 TransactionManager를 DI로 주입받아 사용하는구나라는 사실을 알 수 있습니다.**



![img](의존성 주입.assets/img.png)Spring의 TransactionManger 추상화 계층, 출처 : 토비의 스프링 3.1 5장